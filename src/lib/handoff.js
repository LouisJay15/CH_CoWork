import { EMAIL, WHATSAPP_BASE } from "./site.js";
import { formatRand } from "./calculator.js";

const PLACE = "Charles Hope Coworking Space, 81 Loop Street, 9th floor";

const formatDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

/**
 * The written-out request for sites with no server (GitHub Pages, offline demo):
 * the visitor sends it from WhatsApp or their email app. Nothing is stored by the site.
 */
export function buildHandoff({ kind, page, what, estimate, date, dateLabel = "Preferred date", time, name, email, phone, message }) {
  const lines = [];
  if (kind === "booking") {
    lines.push(`Hello, I would like to send a booking request to ${PLACE}.`, "");
    lines.push(`Request: ${what}`);
    if (Number.isFinite(estimate)) lines.push(`Estimate shown on the site: ${formatRand(estimate)} incl. VAT`);
    if (date) lines.push(`${dateLabel}: ${formatDate(date)}`);
    if (time) lines.push(`Preferred start time: ${time}`);
  } else {
    lines.push(`Hello, I have a question for ${PLACE}.`, "", message || "");
  }
  lines.push("", `Name: ${name}`, `Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (kind === "booking" && message) lines.push("", `Message: ${message}`);
  lines.push("", `I am writing from the ${page} page.`);
  const text = lines.join("\n");
  const subject = kind === "booking" ? `Booking request: ${what}` : `Question from ${name}`;
  return {
    text,
    subject,
    whatsapp: `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`,
    mailto: `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
  };
}
