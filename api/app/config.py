from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    """Read from environment variables (or api/.env). See api/.env.example."""

    model_config = SettingsConfigDict(env_file=Path(__file__).resolve().parents[1] / ".env", extra="ignore")

    environment: Literal["development", "production"] = "development"

    # Supabase: the project URL and the service role key (server only, never in the browser).
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    supabase_table: str = "enquiries"

    # Outgoing email (any SMTP provider: Google Workspace, Microsoft 365, Resend, Postmark, SendGrid...).
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_security: Literal["starttls", "ssl", "none"] = "starttls"
    mail_from: str = ""
    mail_to: str = "louis@charleshope.co.uk"

    # Comma-separated origins allowed to call the API from another domain. Not needed when this app serves the site.
    allowed_origins: str = ""
    # The built front end (npm run build). Served with security headers when present.
    static_dir: Path = ROOT / "dist"

    rate_limit_count: int = 10  # hotel guests may share one IP address on the hotel Wi-Fi
    rate_limit_window_seconds: int = 600
    # Set true behind a proxy that sets X-Forwarded-For (Render, Railway, Fly and most hosts do).
    trust_proxy: bool = False

    @property
    def supabase_configured(self) -> bool:
        return bool(self.supabase_url and self.supabase_service_role_key)

    @property
    def smtp_configured(self) -> bool:
        return bool(self.smtp_host and (self.mail_from or self.smtp_username))

    @property
    def origins(self) -> list[str]:
        return [o.strip().rstrip("/") for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
