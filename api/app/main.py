"""Charles Hope Cowork booking API.

POST /api/enquiries  stores a booking request or question in Supabase and emails it to louis@charleshope.co.uk.
GET  /api/health     reports what is configured.
Everything else serves the built site (../dist) with security headers, when it has been built.
"""
import logging
import secrets
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from .config import Settings, get_settings
from .mailer import ConsoleMailer, Mailer, SmtpMailer, build_email
from .models import EnquiryIn, EnquiryOut
from .ratelimit import RateLimiter
from .rates import describe
from .store import EnquiryStore, MemoryStore, SupabaseStore

log = logging.getLogger("cowork.api")
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

FAIL_MESSAGE = "We could not send your request just now. Please message us on WhatsApp on +27 68 947 8807."

CSP = "; ".join([
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com https://*.google.com https://*.googleapis.com https://*.ggpht.com",
    "media-src 'self' blob:",
    "frame-src https://www.google.com https://maps.google.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
])
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
}


def new_reference() -> str:
    return "CH-" + secrets.token_hex(3).upper()


def default_store(settings: Settings) -> EnquiryStore | None:
    if settings.supabase_configured:
        return SupabaseStore(settings.supabase_url, settings.supabase_service_role_key, settings.supabase_table)
    if settings.environment == "development":
        return MemoryStore()
    log.error("Supabase is not configured: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in production")
    return None


def default_mailer(settings: Settings) -> Mailer | None:
    if settings.smtp_configured:
        return SmtpMailer(settings)
    if settings.environment == "development":
        return ConsoleMailer()
    log.error("SMTP is not configured: SMTP_HOST and MAIL_FROM are required in production")
    return None


def client_key(request: Request, settings: Settings) -> str:
    if settings.trust_proxy:
        forwarded = request.headers.get("x-forwarded-for", "")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def create_app(settings: Settings | None = None, store: EnquiryStore | None = None, mailer: Mailer | None = None) -> FastAPI:
    settings = settings or get_settings()
    app = FastAPI(
        title="Charles Hope Cowork API",
        docs_url="/api/docs" if settings.environment == "development" else None,
        redoc_url=None,
        openapi_url="/api/openapi.json" if settings.environment == "development" else None,
    )
    app.state.settings = settings
    app.state.store = store if store is not None else default_store(settings)
    app.state.mailer = mailer if mailer is not None else default_mailer(settings)
    app.state.limiter = RateLimiter(settings.rate_limit_count, settings.rate_limit_window_seconds)

    if settings.origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.origins,
            allow_methods=["POST", "GET"],
            allow_headers=["Content-Type"],
            max_age=600,
        )

    @app.middleware("http")
    async def security_headers(request: Request, call_next):
        response = await call_next(request)
        for k, v in SECURITY_HEADERS.items():
            response.headers.setdefault(k, v)
        if not request.url.path.startswith("/api/"):
            csp = CSP + ("; upgrade-insecure-requests" if settings.environment == "production" else "")
            response.headers.setdefault("Content-Security-Policy", csp)
        if settings.environment == "production":
            response.headers.setdefault("Strict-Transport-Security", "max-age=86400")
        return response

    @app.exception_handler(RequestValidationError)
    async def validation_error(_request: Request, exc: RequestValidationError):
        """One plain sentence the form can show, plus the field errors for debugging."""
        errors = exc.errors()
        first = errors[0] if errors else {}
        msg = str(first.get("msg", "Please check the form."))
        msg = msg.removeprefix("Value error, ")
        field = ".".join(str(p) for p in first.get("loc", [])[1:])
        if field == "email":
            msg = "Please enter an email address we can reply to."
        elif field and not first.get("type", "").startswith("value_error"):
            msg = f"Please check {field.replace('_', ' ')}: {msg[0].lower() + msg[1:]}."
        return JSONResponse(status_code=422, content={"detail": msg, "errors": [{"loc": e.get("loc"), "msg": e.get("msg")} for e in errors]})

    @app.get("/api/health")
    def health():
        return {
            "ok": True,
            "environment": settings.environment,
            "supabase": settings.supabase_configured,
            "smtp": settings.smtp_configured,
            "mail_to": settings.mail_to,
        }

    @app.post("/api/enquiries", response_model=EnquiryOut, status_code=201)
    def create_enquiry(enquiry: EnquiryIn, request: Request):
        if enquiry.website:  # honeypot filled in: a bot. Look successful, keep nothing.
            log.info("Honeypot triggered; enquiry dropped")
            return EnquiryOut(reference=None)
        if not request.app.state.limiter.allow(client_key(request, settings)):
            raise HTTPException(status_code=429, detail="Too many requests. Please wait a few minutes, or message us on WhatsApp.")

        reference = new_reference()
        summary, estimate = (None, None)
        if enquiry.kind == "booking":
            summary, estimate = describe(enquiry.product, enquiry.desk_type, enquiry.desks, enquiry.days,
                                         enquiry.boardroom_length, enquiry.slots)
        row = {
            "reference": reference,
            "kind": enquiry.kind,
            "product": enquiry.product,
            "desk_type": enquiry.desk_type,
            "desks": enquiry.desks,
            "days": enquiry.days,
            "boardroom_length": enquiry.boardroom_length,
            "slots": enquiry.slots,
            "preferred_date": enquiry.preferred_date.isoformat() if enquiry.preferred_date else None,
            "preferred_time": enquiry.preferred_time,
            "summary": summary,
            "estimate_zar": estimate,
            "name": enquiry.name,
            "email": str(enquiry.email),
            "phone": enquiry.phone,
            "message": enquiry.message,
            "page": enquiry.page,
            "consent": enquiry.consent,
        }

        store: EnquiryStore | None = request.app.state.store
        mailer: Mailer | None = request.app.state.mailer
        stored = sent = False
        if store is not None:
            try:
                store.insert(row)
                stored = True
            except Exception:
                log.exception("Could not store enquiry %s", reference)
        if mailer is not None:
            try:
                mailer.send(build_email(enquiry, reference, summary, estimate, settings))
                sent = True
            except Exception:
                log.exception("Could not email enquiry %s", reference)
        if stored and sent:
            try:
                store.mark_emailed(reference)
            except Exception:
                log.exception("Could not mark enquiry %s as emailed", reference)
        if not stored and not sent:
            raise HTTPException(status_code=503, detail=FAIL_MESSAGE)
        log.info("Enquiry %s received (stored=%s, emailed=%s)", reference, stored, sent)
        return EnquiryOut(reference=reference)

    # ---- The built site ----
    static_dir = Path(settings.static_dir).resolve()
    index = static_dir / "index.html"

    @app.api_route("/{full_path:path}", methods=["GET", "HEAD"], include_in_schema=False)
    def site(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404)
        if not index.exists():
            return JSONResponse(status_code=404, content={"detail": "The site has not been built. Run npm run build."})
        candidate = (static_dir / full_path).resolve()
        if full_path and candidate.is_file() and candidate.is_relative_to(static_dir):
            headers = {"Cache-Control": "public, max-age=31536000, immutable"} if full_path.startswith("assets/") else None
            return FileResponse(candidate, headers=headers)
        return FileResponse(index, headers={"Cache-Control": "no-cache"})

    return app


app = create_app()
