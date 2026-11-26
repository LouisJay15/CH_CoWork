"""Where enquiries are kept: Supabase in production, memory for local development."""
import logging
from typing import Protocol

log = logging.getLogger("cowork.store")


class EnquiryStore(Protocol):
    def insert(self, row: dict) -> None: ...
    def mark_emailed(self, reference: str) -> None: ...


class SupabaseStore:
    """Writes to the `enquiries` table with the service role key (row level security blocks everyone else)."""

    def __init__(self, url: str, key: str, table: str = "enquiries"):
        from supabase import create_client

        self.client = create_client(url, key)
        self.table = table

    def insert(self, row: dict) -> None:
        self.client.table(self.table).insert(row).execute()

    def mark_emailed(self, reference: str) -> None:
        self.client.table(self.table).update({"email_sent": True}).eq("reference", reference).execute()


class MemoryStore:
    """Development only: keeps rows in memory and logs them."""

    def __init__(self):
        self.rows: list[dict] = []

    def insert(self, row: dict) -> None:
        self.rows.append(dict(row))
        log.info("Stored enquiry %s in memory (Supabase is not configured)", row.get("reference"))

    def mark_emailed(self, reference: str) -> None:
        for row in self.rows:
            if row.get("reference") == reference:
                row["email_sent"] = True
