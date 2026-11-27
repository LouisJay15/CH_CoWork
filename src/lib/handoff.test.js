import { describe, expect, it } from "vitest";
import { buildHandoff } from "./handoff.js";

describe("form hand-off (no server)", () => {
  const booking = buildHandoff({
    kind: "booking", page: "Book", what: "2 Screen desks, monthly", estimate: 7500, date: "2026-12-01",
    dateLabel: "Start date", name: "Thandi Mokoena", email: "thandi@example.com", phone: "082 000 0000", message: "Trial in the High Court.",
  });
  it("writes the booking out in full", () => {
    expect(booking.text).toContain("Request: 2 Screen desks, monthly");
    expect(booking.text).toContain("Estimate shown on the site: R7,500 incl. VAT");
    expect(booking.text).toContain("Start date: Tuesday, 1 December 2026");
    expect(booking.text).toContain("Phone: 082 000 0000");
    expect(booking.text).toContain("I am writing from the Book page.");
  });
  it("opens WhatsApp and email, fully encoded", () => {
    expect(booking.whatsapp.startsWith("https://wa.me/27689478807?text=")).toBe(true);
    expect(decodeURIComponent(booking.whatsapp.split("?text=")[1])).toBe(booking.text);
    expect(booking.mailto.startsWith("mailto:louis@charleshope.co.uk?subject=Booking%20request%3A%202%20Screen%20desks%2C%20monthly&body=")).toBe(true);
    expect(booking.whatsapp).not.toMatch(/[ \n]/);
  });
  it("writes a question", () => {
    const q = buildHandoff({ kind: "question", page: "FAQ", name: "Sam", email: "sam@example.com", message: "Is there a printer?" });
    expect(q.text).toContain("Is there a printer?");
    expect(q.subject).toBe("Question from Sam");
    expect(q.text).not.toContain("Phone:");
  });
  it("uses no en or em dashes", () => expect(/[–—]/.test(booking.text)).toBe(false));
});
