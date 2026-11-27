import { API_BASE } from "./site.js";

export class EnquiryError extends Error {}

/** Send a booking request or a question to the Python API, which stores it in Supabase and emails it. */
export async function sendEnquiry(payload) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new EnquiryError("We could not reach the server. Please check your connection, or message us on WhatsApp.");
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 429) throw new EnquiryError("Too many requests from this connection. Please wait a few minutes, or message us on WhatsApp.");
  if (!res.ok) {
    const detail = typeof data.detail === "string" ? data.detail : null;
    throw new EnquiryError(detail || "Something went wrong sending your request. Please try again, or message us on WhatsApp.");
  }
  return data;
}
