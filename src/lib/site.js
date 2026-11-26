const env = import.meta.env ?? {};

/** The site's HTTPS origin, no trailing slash. Used for canonical links, Open Graph and JSON-LD. */
export const SITE_URL = (env.VITE_SITE_URL || "https://YOUR-PROJECT.lovable.app").replace(/\/+$/, "");

export const PHONE_DISPLAY = "021 600 6826";
export const PHONE_TEL = "tel:+27216006826";
export const PHONE_E164 = "+27216006826";
export const EMAIL = "louis@charleshope.co.uk";
export const LEGAL_NAME = "CHARLES HOPE SA (PTY) LTD";

export const WHATSAPP_NUMBER_DISPLAY = "+27 68 947 8807";
export const WHATSAPP_BASE = "https://wa.me/27689478807";

export const ADDRESS_LINE = "81 Loop Street, 9th floor, Cape Town";
export const MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("81 Loop Street, Cape Town");
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=" + encodeURIComponent("81 Loop Street, Cape Town") + "&output=embed";

/** Where the booking API lives. Empty means the same origin. */
export const API_BASE = (env.VITE_API_BASE || "").replace(/\/+$/, "");
/** The offline demo build shows the forms but does not send them. */
export const DEMO_FORMS = env.VITE_DEMO_FORMS === "true";

/** Path to a file in /public, respecting the build's base path. */
export const asset = (path) => `${env.BASE_URL ?? "/"}${String(path).replace(/^\/+/, "")}`;
