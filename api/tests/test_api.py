import json
import socket
import threading
import time
from datetime import date, timedelta
from email import message_from_bytes, policy
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app
from app.mailer import SmtpMailer, build_email
from app.models import EnquiryIn
from app.rates import describe
from app.store import SupabaseStore

TOMORROW = (date.today() + timedelta(days=2)).isoformat()


class FakeStore:
    def __init__(self, fail=False):
        self.rows, self.emailed, self.fail = [], [], fail

    def insert(self, row):
        if self.fail:
            raise RuntimeError("database down")
        self.rows.append(row)

    def mark_emailed(self, reference):
        self.emailed.append(reference)


class FakeMailer:
    def __init__(self, fail=False):
        self.sent, self.fail = [], fail

    def send(self, message):
        if self.fail:
            raise RuntimeError("smtp down")
        self.sent.append(message)


@pytest.fixture
def site_dir(tmp_path):
    (tmp_path / "assets").mkdir()
    (tmp_path / "index.html").write_text("<!doctype html><title>Charles Hope Cowork</title>")
    (tmp_path / "assets" / "app.js").write_text("console.log(1)")
    import gzip
    (tmp_path / "assets" / "app.js.gz").write_bytes(gzip.compress(b"console.log(1)"))
    return tmp_path


def make_client(site_dir, store=None, mailer=None, **overrides):
    settings = Settings(_env_file=None, environment="development", static_dir=site_dir, **overrides)
    store = store if store is not None else FakeStore()
    mailer = mailer if mailer is not None else FakeMailer()
    return TestClient(create_app(settings, store=store, mailer=mailer)), store, mailer


def booking(**kw):
    body = {
        "kind": "booking",
        "product": "monthly-desk",
        "desk_type": "screen",
        "desks": 3,
        "preferred_date": TOMORROW,
        "name": "Thandi Mokoena",
        "email": "thandi@example.com",
        "phone": "082 000 0000",
        "message": "Visiting for a trial in the High Court.",
        "page": "Book",
        "consent": True,
        "website": "",
    }
    body.update(kw)
    return body


# ---------- rates match the site's calculator ----------

@pytest.mark.parametrize(
    "args,summary,total",
    [
        (("monthly-desk", "basic", 1, None, None, None), "1 Basic desk, monthly", 3000),
        (("monthly-desk", "screen", 3, None, None, None), "3 Screen desks, monthly", 11250),
        (("day-pass", "basic", 2, 3, None, None), "2 Basic desks, day pass, 3 days", 1680),
        (("day-pass", "screen", 1, 11, None, None), "1 Screen desk, day pass, 11 days", 3850),
        (("hotel-guest", "basic", 2, 1, None, None), "2 hotel guest desks, 1 day", 400),
        (("private-workspace", None, None, 5, None, None), "1 private workspace, 5 days", 2250),
        (("boardroom", None, None, None, "four-hours", 2), "2 boardroom slots, four hours", 3000),
        (("boardroom", None, None, None, "full-day", 1), "1 boardroom slot, full day", 4000),
        (("glass-meeting-pod", None, None, None, None, None), "Glass meeting pod", None),
    ],
)
def test_describe(args, summary, total):
    assert describe(*args) == (summary, total)


# ---------- the endpoint ----------

def test_booking_is_stored_and_emailed(site_dir):
    client, store, mailer = make_client(site_dir)
    r = client.post("/api/enquiries", json=booking())
    assert r.status_code == 201, r.text
    ref = r.json()["reference"]
    assert ref.startswith("CH-") and len(ref) == 9

    row = store.rows[0]
    assert row["reference"] == ref
    assert row["summary"] == "3 Screen desks, monthly"
    assert row["estimate_zar"] == 11250
    assert row["days"] is None and row["slots"] is None  # only fields that apply are kept
    assert store.emailed == [ref]

    msg = mailer.sent[0]
    assert msg["To"] == "louis@charleshope.co.uk"
    assert "thandi@example.com" in msg["Reply-To"]
    assert msg["Subject"] == f"Booking request {ref}: 3 Screen desks, monthly (R11,250) from Thandi Mokoena"
    body = msg.get_content()
    assert "R11,250 incl. VAT (not a quote)" in body
    assert "Visiting for a trial in the High Court." in body


def test_estimate_is_computed_on_the_server(site_dir):
    client, store, _ = make_client(site_dir)
    r = client.post("/api/enquiries", json=booking(estimate_zar=1, summary="free desks"))
    assert r.status_code == 201
    assert store.rows[0]["estimate_zar"] == 11250
    assert store.rows[0]["summary"] == "3 Screen desks, monthly"


def test_question(site_dir):
    client, store, mailer = make_client(site_dir)
    r = client.post("/api/enquiries", json={"kind": "question", "name": "Sam", "email": "sam@example.com", "message": "Is there a printer?", "consent": True, "product": "boardroom"})
    assert r.status_code == 201
    assert store.rows[0]["product"] is None
    assert mailer.sent[0]["Subject"].startswith("Question CH-")


@pytest.mark.parametrize(
    "patch,expected",
    [
        ({"consent": False}, "Please agree that we may store your details and reply."),
        ({"preferred_date": (date.today() - timedelta(days=3)).isoformat()}, "Please choose today or a later date."),
        ({"preferred_date": None}, "Please choose a date."),
        ({"product": None}, "Please choose what you would like to book."),
        ({"email": "not-an-email"}, "Please enter an email address we can reply to."),
        ({"desks": 21}, "Please check desks"),
    ],
)
def test_validation_messages(site_dir, patch, expected):
    client, store, _ = make_client(site_dir)
    r = client.post("/api/enquiries", json=booking(**patch))
    assert r.status_code == 422
    assert r.json()["detail"].startswith(expected)
    assert store.rows == []


def test_question_needs_a_message(site_dir):
    client, _, _ = make_client(site_dir)
    r = client.post("/api/enquiries", json={"kind": "question", "name": "Sam", "email": "sam@example.com", "consent": True})
    assert r.status_code == 422
    assert r.json()["detail"] == "Please type your question."


def test_newlines_cannot_reach_email_headers(site_dir):
    client, _, mailer = make_client(site_dir)
    r = client.post("/api/enquiries", json=booking(name="Eve\r\nBcc: victim@example.com"))
    assert r.status_code == 201
    assert "\n" not in mailer.sent[0]["Subject"]
    assert mailer.sent[0]["Bcc"] is None


def test_honeypot_is_dropped_quietly(site_dir):
    client, store, mailer = make_client(site_dir)
    r = client.post("/api/enquiries", json=booking(website="http://spam.example"))
    assert r.status_code == 201
    assert r.json()["reference"] is None
    assert store.rows == [] and mailer.sent == []


def test_rate_limit(site_dir):
    client, _, _ = make_client(site_dir, rate_limit_count=2)
    assert client.post("/api/enquiries", json=booking()).status_code == 201
    assert client.post("/api/enquiries", json=booking()).status_code == 201
    r = client.post("/api/enquiries", json=booking())
    assert r.status_code == 429


def test_email_still_goes_if_the_database_fails(site_dir):
    client, store, mailer = make_client(site_dir, store=FakeStore(fail=True))
    assert client.post("/api/enquiries", json=booking()).status_code == 201
    assert len(mailer.sent) == 1 and store.emailed == []


def test_stored_even_if_email_fails(site_dir):
    client, store, _ = make_client(site_dir, mailer=FakeMailer(fail=True))
    assert client.post("/api/enquiries", json=booking()).status_code == 201
    assert len(store.rows) == 1 and store.emailed == []


def test_503_when_nothing_works(site_dir):
    client, _, _ = make_client(site_dir, store=FakeStore(fail=True), mailer=FakeMailer(fail=True))
    r = client.post("/api/enquiries", json=booking())
    assert r.status_code == 503
    assert "WhatsApp" in r.json()["detail"]


def test_production_without_configuration_refuses(site_dir):
    settings = Settings(_env_file=None, environment="production", static_dir=site_dir)
    client = TestClient(create_app(settings))
    assert client.post("/api/enquiries", json=booking()).status_code == 503
    assert client.get("/api/health").json() == {"ok": True, "environment": "production", "supabase": False, "smtp": False, "mail_to": "louis@charleshope.co.uk"}


# ---------- serving the site ----------

def test_site_routes_and_headers(site_dir):
    client, _, _ = make_client(site_dir)
    for path in ["/", "/desks-and-pricing", "/book"]:
        r = client.get(path)
        assert r.status_code == 200 and "Charles Hope Cowork" in r.text
        assert "frame-ancestors 'none'" in r.headers["content-security-policy"]
        assert "media-src 'self'" in r.headers["content-security-policy"]
        assert r.headers["x-frame-options"] == "DENY"
    asset = client.get("/assets/app.js", headers={"Accept-Encoding": "gzip"})
    assert asset.status_code == 200 and "immutable" in asset.headers["cache-control"]
    assert asset.headers["content-encoding"] == "gzip" and asset.text == "console.log(1)"
    assert "javascript" in asset.headers["content-type"]
    plain = client.get("/assets/app.js", headers={"Accept-Encoding": "identity"})
    assert "content-encoding" not in plain.headers and plain.text == "console.log(1)"
    assert client.get("/api/nope").status_code == 404
    traversal = client.get("/..%2F..%2Fetc%2Fpasswd")
    assert "root:" not in traversal.text


# ---------- real SMTP, against a local server ----------

def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def test_smtp_mailer_sends_a_real_message():
    from aiosmtpd.controller import Controller

    received = []

    class Handler:
        async def handle_DATA(self, server, session, envelope):
            received.append(envelope)
            return "250 OK"

    port = free_port()
    controller = Controller(Handler(), hostname="127.0.0.1", port=port)
    controller.start()
    try:
        settings = Settings(_env_file=None, smtp_host="127.0.0.1", smtp_port=port, smtp_security="none", mail_from="bookings@charleshope.co.uk")
        enquiry = EnquiryIn(**booking())
        SmtpMailer(settings).send(build_email(enquiry, "CH-ABC123", "3 Screen desks, monthly", 11250, settings))
    finally:
        controller.stop()
    assert received[0].rcpt_tos == ["louis@charleshope.co.uk"]
    msg = message_from_bytes(received[0].content, policy=policy.default)
    assert msg["Subject"] == "Booking request CH-ABC123: 3 Screen desks, monthly (R11,250) from Thandi Mokoena"
    assert msg["Reply-To"] == "Thandi Mokoena <thandi@example.com>"


# ---------- the real Supabase client, against a local stand-in for its REST API ----------

def test_supabase_store_uses_the_rest_api():
    calls = []

    class PostgREST(BaseHTTPRequestHandler):
        def _reply(self, status, body):
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(body).encode())

        def do_POST(self):
            length = int(self.headers["Content-Length"])
            calls.append(("POST", self.path, dict(self.headers), json.loads(self.rfile.read(length))))
            self._reply(201, [{}])

        def do_PATCH(self):
            length = int(self.headers["Content-Length"])
            calls.append(("PATCH", self.path, dict(self.headers), json.loads(self.rfile.read(length))))
            self._reply(200, [])

        def log_message(self, *args):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", 0), PostgREST)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        key = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.c2lnbmF0dXJl"
        store = SupabaseStore(f"http://127.0.0.1:{server.server_port}", key)
        store.insert({"reference": "CH-ABC123", "kind": "booking", "name": "Thandi"})
        store.mark_emailed("CH-ABC123")
    finally:
        server.shutdown()

    method, path, headers, body = calls[0]
    assert method == "POST" and path.startswith("/rest/v1/enquiries")
    lower = {k.lower(): v for k, v in headers.items()}
    assert lower["apikey"] == key and lower["authorization"] == f"Bearer {key}"
    assert body["reference"] == "CH-ABC123"
    assert calls[1][0] == "PATCH" and "reference=eq.CH-ABC123" in calls[1][1] and calls[1][3] == {"email_sent": True}
