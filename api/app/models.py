from datetime import date, datetime, timedelta, timezone
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

from .rates import USES_DAYS, USES_DESK_TYPE, USES_DESKS, USES_TIME

SAST = timezone(timedelta(hours=2))  # South Africa has no daylight saving

Product = Literal[
    "site-inspection", "monthly-desk", "day-pass", "hotel-guest",
    "private-workspace", "boardroom", "glass-meeting-pod", "phone-booth",
]


def _one_line(value: str | None) -> str | None:
    if value is None:
        return None
    value = " ".join(value.split())
    return value or None


class EnquiryIn(BaseModel):
    """A booking request or a question from the site."""

    model_config = ConfigDict(extra="ignore", str_strip_whitespace=True)

    kind: Literal["booking", "question"]
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    message: str | None = Field(default=None, max_length=2000)

    product: Product | None = None
    desk_type: Literal["basic", "screen"] | None = None
    desks: int | None = Field(default=None, ge=1, le=20)
    days: int | None = Field(default=None, ge=1, le=366)
    boardroom_length: Literal["four-hours", "full-day"] | None = None
    slots: int | None = Field(default=None, ge=1, le=60)
    preferred_date: date | None = None
    preferred_time: str | None = Field(default=None, pattern=r"^([01]\d|2[0-3]):[0-5]\d$")

    page: str | None = Field(default=None, max_length=60)
    consent: bool
    website: str | None = Field(default=None, max_length=200)  # honeypot: people leave it empty

    @field_validator("name", "phone", "page")
    @classmethod
    def single_line(cls, v: str | None) -> str | None:
        return _one_line(v)

    @model_validator(mode="after")
    def check(self) -> "EnquiryIn":
        if not self.consent:
            raise ValueError("Please agree that we may store your details and reply.")
        if self.kind == "question":
            if not self.message:
                raise ValueError("Please type your question.")
            self.product = self.desk_type = self.boardroom_length = self.preferred_time = None
            self.desks = self.days = self.slots = None
            self.preferred_date = None
            return self
        if self.product is None:
            raise ValueError("Please choose what you would like to book.")
        if self.preferred_date is None:
            raise ValueError("Please choose a date.")
        if self.preferred_date < datetime.now(SAST).date():
            raise ValueError("Please choose today or a later date.")
        # Keep only the fields that apply to this product, with sensible defaults.
        p = self.product
        self.desk_type = (self.desk_type or "basic") if p in USES_DESK_TYPE else None
        self.desks = (self.desks or 1) if p in USES_DESKS else None
        self.days = (self.days or 1) if p in USES_DAYS else None
        if p == "boardroom":
            self.boardroom_length = self.boardroom_length or "four-hours"
            self.slots = self.slots or 1
        else:
            self.boardroom_length = self.slots = None
        if p not in USES_TIME or (p == "boardroom" and self.boardroom_length == "full-day"):
            self.preferred_time = None
        return self


class EnquiryOut(BaseModel):
    ok: bool = True
    reference: str | None
