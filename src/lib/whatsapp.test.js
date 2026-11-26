import { describe, expect, it } from "vitest";
import { buildWhatsAppText, buildWhatsAppUrl } from "./whatsapp.js";
import { estimate } from "./calculator.js";

describe("WhatsApp prefills", () => {
  it("template A names the page", () => {
    expect(buildWhatsAppText({ page: "Home" })).toBe(
      "Hello, I would like to book a site inspection at Charles Hope Cowork, 81 Loop Street, 9th floor, and request a quote. I am writing from the Home page.",
    );
  });

  it("E11: T3 on Desks and pricing", () => {
    const e = estimate({ product: "hot-desk", deskType: "screen", term: "monthly", desks: 3 });
    const text = buildWhatsAppText({ page: "Desks and pricing", option: e.summary, estimate: e.total });
    expect(text).toContain("3 Screen desks, monthly");
    expect(text).toContain("R11,250");
    expect(text).toContain("Desks and pricing");
    expect(text).toContain("Prices shown on the site are incl. VAT.");
  });

  it("E12: T21 names full day, R4,000 and the page", () => {
    const e = estimate({ product: "boardroom", boardroomLength: "full-day", slots: 1 });
    const text = buildWhatsAppText({ page: "Home", option: e.summary, estimate: e.total });
    expect(text).toContain("full day");
    expect(text).toContain("R4,000");
    expect(text).toContain("the Home page");
  });

  it("templates C to F", () => {
    expect(buildWhatsAppText({ page: "Hotel guests", template: "hotel-guest" })).toBe(
      "Hello, I am a guest at the Charles Hope hotel and would like to use Charles Hope Cowork. Please tell me how to book the hotel guest rate. I am writing from the Hotel guests page.",
    );
    expect(buildWhatsAppText({ page: "Home", template: "noah" })).toContain("Noah restaurant discount for monthly tenants");
    expect(buildWhatsAppText({ page: "Amenities", template: "room", room: "pod" })).toBe(
      "Hello, I would like to check a time slot for the glass meeting pod at Charles Hope Cowork, 81 Loop Street, 9th floor. I am writing from the Amenities page.",
    );
    expect(buildWhatsAppText({ page: "Day pass", template: "day-pass" })).toBe(
      "Hello, I would like to book a day pass at Charles Hope Cowork, 81 Loop Street, 9th floor, and request a quote. I am writing from the Day pass page.",
    );
  });

  it("URL is fully encoded and never has an empty text", () => {
    const url = buildWhatsAppUrl({ page: "Book" });
    expect(url.startsWith("https://wa.me/27689478807?text=")).toBe(true);
    const text = url.split("?text=")[1];
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toMatch(/[ \n]/);
    expect(decodeURIComponent(text)).toContain("the Book page");
  });

  it("an option without an estimate falls back to the page template", () => {
    expect(buildWhatsAppText({ page: "Day pass", option: "x", template: "day-pass" })).toContain("book a day pass");
  });
});
