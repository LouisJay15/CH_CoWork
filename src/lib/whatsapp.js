import { WHATSAPP_BASE } from "./site.js";
import { formatNumber } from "./calculator.js";

const PLACE = "Charles Hope Coworking Space, 81 Loop Street, 9th floor";

export const ROOMS = {
  boardroom: "a boardroom",
  pod: "the glass meeting pod",
  booth: "a phone booth",
  "private-workspace": "a private workspace",
};

/**
 * The prefilled WhatsApp message (plan section 7.2). An option plus an estimate always uses template B.
 * @param {{ page?: string, option?: string, estimate?: number, template?: "default"|"hotel-guest"|"noah"|"room"|"day-pass", room?: string }} args
 */
export function buildWhatsAppText({ page, option, estimate, template = "default", room } = {}) {
  const from = `I am writing from the ${page || "Home"} page.`;
  if (option && Number.isFinite(estimate)) {
    return `Hello, I would like to book a site inspection at ${PLACE}, and request a quote for: ${option}. Estimated total shown on the site: R${formatNumber(estimate)}. ${from} Prices shown on the site are incl. VAT. Please confirm availability and the final quote.`;
  }
  switch (template) {
    case "hotel-guest":
      return `Hello, I am a guest at the Charles Hope hotel and would like to use Charles Hope Coworking Space. Please tell me how to book the hotel guest rate. ${from}`;
    case "noah":
      return `Hello, I would like to ask about the Noah restaurant discount for monthly tenants and corporate accommodation rates at the Charles Hope hotel. ${from}`;
    case "room":
      return `Hello, I would like to check a time slot for ${ROOMS[room] || room || ROOMS.boardroom} at ${PLACE}. ${from}`;
    case "day-pass":
      return `Hello, I would like to book a day pass at ${PLACE}, and request a quote. ${from}`;
    default:
      return `Hello, I would like to book a site inspection at ${PLACE}, and request a quote. ${from}`;
  }
}

export function buildWhatsAppUrl(args) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(buildWhatsAppText(args))}`;
}
