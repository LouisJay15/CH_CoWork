"""Published rates (incl. VAT) and the same estimate the site shows. Never adds VAT, fees or discounts."""

RATES = {
    "basic_monthly": 3000,
    "basic_daily": 280,
    "screen_monthly": 3750,
    "screen_daily": 350,
    "hotel_guest_daily": 200,
    "private_workspace_daily": 450,
    "boardroom_four_hours": 1500,
    "boardroom_full_day": 4000,
}

PRODUCT_LABELS = {
    "site-inspection": "Site inspection",
    "monthly-desk": "Monthly desk",
    "day-pass": "Day pass",
    "hotel-guest": "Hotel guest desk",
    "private-workspace": "Private workspace",
    "boardroom": "Boardroom",
    "glass-meeting-pod": "Glass meeting pod",
    "phone-booth": "Phone booth",
}

USES_DESK_TYPE = {"monthly-desk", "day-pass", "hotel-guest"}
USES_DESKS = {"monthly-desk", "day-pass", "hotel-guest"}
USES_DAYS = {"day-pass", "hotel-guest", "private-workspace"}
USES_TIME = {"site-inspection", "boardroom", "glass-meeting-pod", "phone-booth"}


def format_rand(n: int) -> str:
    return f"R{n:,}"


def _count(n: int, one: str, many: str) -> str:
    return f"{n} {one if n == 1 else many}"


def describe(product: str, desk_type: str | None, desks: int | None, days: int | None,
             boardroom_length: str | None, slots: int | None) -> tuple[str, int | None]:
    """The summary sentence and the estimated total in rand (None where there is no separate price)."""
    name = "Screen" if desk_type == "screen" else "Basic"
    desks = desks or 1
    days = days or 1
    slots = slots or 1
    if product == "monthly-desk":
        rate = RATES["screen_monthly"] if desk_type == "screen" else RATES["basic_monthly"]
        return f"{_count(desks, f'{name} desk', f'{name} desks')}, monthly", desks * rate
    if product == "day-pass":
        rate = RATES["screen_daily"] if desk_type == "screen" else RATES["basic_daily"]
        return (f"{_count(desks, f'{name} desk', f'{name} desks')}, day pass, {_count(days, 'day', 'days')}",
                desks * days * rate)
    if product == "hotel-guest":
        return (f"{_count(desks, 'hotel guest desk', 'hotel guest desks')}, {_count(days, 'day', 'days')}",
                desks * days * RATES["hotel_guest_daily"])
    if product == "private-workspace":
        return f"1 private workspace, {_count(days, 'day', 'days')}", days * RATES["private_workspace_daily"]
    if product == "boardroom":
        full = boardroom_length == "full-day"
        rate = RATES["boardroom_full_day"] if full else RATES["boardroom_four_hours"]
        return f"{_count(slots, 'boardroom slot', 'boardroom slots')}, {'full day' if full else 'four hours'}", slots * rate
    return PRODUCT_LABELS.get(product, product), None
