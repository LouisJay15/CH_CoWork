"""Builds the lead email and sends it to louis@charleshope.co.uk over SMTP."""
import logging
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from typing import Protocol

from .config import Settings
from .models import EnquiryIn
from .rates import PRODUCT_LABELS, format_rand

log = logging.getLogger("cowork.mail")


class Mailer(Protocol):
    def send(self, message: EmailMessage) -> None: ...


class SmtpMailer:
    def __init__(self, settings: Settings):
        self.s = settings

    def send(self, message: EmailMessage) -> None:
        s = self.s
        if s.smtp_security == "ssl":
            server = smtplib.SMTP_SSL(s.smtp_host, s.smtp_port, timeout=20, context=ssl.create_default_context())
        else:
            server = smtplib.SMTP(s.smtp_host, s.smtp_port, timeout=20)
        with server:
            if s.smtp_security == "starttls":
                server.starttls(context=ssl.create_default_context())
            if s.smtp_username:
                server.login(s.smtp_username, s.smtp_password)
            server.send_message(message)


class ConsoleMailer:
    """Development only: prints the email instead of sending it."""

    def __init__(self):
        self.sent: list[EmailMessage] = []

    def send(self, message: EmailMessage) -> None:
        self.sent.append(message)
        log.info("Email not sent (SMTP is not configured). It would have been:\n%s", message.as_string())


def build_email(e: EnquiryIn, reference: str, summary: str | None, estimate: int | None, settings: Settings) -> EmailMessage:
    msg = EmailMessage()
    who = e.name
    if e.kind == "booking":
        price = f" ({format_rand(estimate)})" if estimate is not None else ""
        msg["Subject"] = f"Booking request {reference}: {summary}{price} from {who}"
    else:
        msg["Subject"] = f"Question {reference} from {who}"
    sender = settings.mail_from or settings.smtp_username or "website@localhost"
    msg["From"] = sender if "<" in sender else formataddr(("Charles Hope Cowork website", sender))
    msg["To"] = settings.mail_to
    msg["Reply-To"] = formataddr((who, str(e.email)))
    msg["Message-ID"] = make_msgid(domain="charleshope.co.uk")

    lines = [f"New {'booking request' if e.kind == 'booking' else 'question'} from the Charles Hope Cowork website", f"Reference: {reference}", ""]
    if e.kind == "booking":
        lines += [f"What: {PRODUCT_LABELS.get(e.product, e.product)}", f"Details: {summary}"]
        if e.product == "hotel-guest" and e.desk_type:
            lines.append(f"Desk type asked for: {'Screen' if e.desk_type == 'screen' else 'Basic'} (the guest rate stays R200 per day)")
        if estimate is not None:
            lines.append(f"Estimate from published rates: {format_rand(estimate)} incl. VAT (not a quote)")
        elif e.product in ("glass-meeting-pod", "phone-booth"):
            lines.append("Included in the desk rates: no separate charge")
        lines.append(f"{'Start date' if e.product == 'monthly-desk' else 'Preferred date'}: {e.preferred_date:%A %d %B %Y}")
        if e.preferred_time:
            lines.append(f"Preferred start time: {e.preferred_time}")
        lines.append("")
    lines += [f"Name: {e.name}", f"Email: {e.email}", f"Phone: {e.phone or 'not given'}", ""]
    if e.message:
        lines += ["Message:", e.message, ""]
    lines += [
        f"Sent from the {e.page or 'website'} page. Reply to this email to answer {e.name} directly.",
        "The visitor agreed that we may store their details and contact them about this request.",
    ]
    msg.set_content("\n".join(lines))
    return msg
