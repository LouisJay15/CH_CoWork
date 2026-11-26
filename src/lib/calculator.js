// Desk and room estimate. Published rates already include VAT, so totals are sums of those rates only:
// no VAT, fees or discounts are ever added here.

export const RATES = Object.freeze({
  basicMonthly: 3000,
  basicDaily: 280,
  screenMonthly: 3750,
  screenDaily: 350,
  hotelGuestDaily: 200,
  privateWorkspaceDaily: 450,
  boardroomFourHours: 1500,
  boardroomFullDay: 4000,
});

export const DESK_MIN = 1;
export const DESK_MAX = 20; // practical control range, not a floor capacity
export const DAYS_MIN = 1;
export const SLOTS_MIN = 1;

export const PRODUCTS = ["hot-desk", "hotel-guest", "private-workspace", "boardroom"];
export const PRODUCT_LABELS = {
  "hot-desk": "Hot desk",
  "hotel-guest": "Hotel guest",
  "private-workspace": "Private workspace",
  boardroom: "Boardroom",
};

export const DEFAULT_SELECTION = Object.freeze({
  product: "hot-desk",
  deskType: "basic",
  term: "monthly",
  desks: 1,
  days: 1,
  boardroomLength: "four-hours",
  slots: 1,
});

export const DAY_PASS_HINTS = {
  basic:
    "11 or more Basic day passes (R3,080 for 11 days, one desk) cost more than a Basic monthly desk at R3,000. Ask us which option fits.",
  screen:
    "11 or more Screen day passes (R3,850 for 11 days, one desk) cost more than a Screen monthly desk at R3,750. Ask us which option fits.",
};

/** Round to the nearest integer, then clamp. Empty or invalid input becomes the minimum. */
export function toInt(value, min, max) {
  const n = typeof value === "number" ? value : parseFloat(String(value ?? "").trim());
  if (!Number.isFinite(n)) return min;
  let r = Math.round(n);
  if (r < min) r = min;
  if (max !== undefined && r > max) r = max;
  return r;
}

export function normalize(selection = {}) {
  const s = { ...DEFAULT_SELECTION, ...selection };
  return {
    product: PRODUCTS.includes(s.product) ? s.product : "hot-desk",
    deskType: s.deskType === "screen" ? "screen" : "basic",
    term: s.term === "day-pass" ? "day-pass" : "monthly",
    desks: toInt(s.desks, DESK_MIN, DESK_MAX),
    days: toInt(s.days, DAYS_MIN),
    boardroomLength: s.boardroomLength === "full-day" ? "full-day" : "four-hours",
    slots: toInt(s.slots, SLOTS_MIN),
  };
}

export function formatNumber(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatRand(n) {
  return `R${formatNumber(n)}`;
}

const count = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const deskName = (type) => (type === "screen" ? "Screen" : "Basic");

/** Which inputs a product uses. */
export function usesDesks(sel) {
  return sel.product === "hot-desk" || sel.product === "hotel-guest";
}
export function usesDays(sel) {
  return (
    (sel.product === "hot-desk" && sel.term === "day-pass") ||
    sel.product === "hotel-guest" ||
    sel.product === "private-workspace"
  );
}

/**
 * @returns {{ selection: object, total: number, lines: {label: string, amount: number}[], summary: string, hint: string | null }}
 */
export function estimate(input) {
  const s = normalize(input);
  let total = 0;
  let label = "";
  let summary = "";
  let hint = null;

  switch (s.product) {
    case "hot-desk": {
      const name = deskName(s.deskType);
      const desks = count(s.desks, `${name} desk`, `${name} desks`);
      const monthlyRate = s.deskType === "screen" ? RATES.screenMonthly : RATES.basicMonthly;
      if (s.term === "monthly") {
        total = s.desks * monthlyRate;
        label = `${desks} at ${formatRand(monthlyRate)} per month`;
        summary = `${desks}, monthly`;
      } else {
        const dailyRate = s.deskType === "screen" ? RATES.screenDaily : RATES.basicDaily;
        total = s.desks * s.days * dailyRate;
        label = `${desks} for ${count(s.days, "day", "days")} at ${formatRand(dailyRate)} per day`;
        summary = `${desks}, day pass, ${count(s.days, "day", "days")}`;
        if (total > s.desks * monthlyRate) hint = DAY_PASS_HINTS[s.deskType];
      }
      break;
    }
    case "hotel-guest": {
      total = s.desks * s.days * RATES.hotelGuestDaily;
      const desks = count(s.desks, "hotel guest desk", "hotel guest desks");
      label = `${desks} for ${count(s.days, "day", "days")} at ${formatRand(RATES.hotelGuestDaily)} per day`;
      summary = `${desks}, ${count(s.days, "day", "days")}`;
      break;
    }
    case "private-workspace": {
      total = s.days * RATES.privateWorkspaceDaily;
      label = `Private workspace for ${count(s.days, "day", "days")} at ${formatRand(RATES.privateWorkspaceDaily)} per day`;
      summary = `1 private workspace, ${count(s.days, "day", "days")}`;
      break;
    }
    case "boardroom": {
      const full = s.boardroomLength === "full-day";
      const rate = full ? RATES.boardroomFullDay : RATES.boardroomFourHours;
      total = s.slots * rate;
      const slots = count(s.slots, "boardroom slot", "boardroom slots");
      label = `${slots}, ${full ? "full day" : "four hours"}, at ${formatRand(rate)} each`;
      summary = `${slots}, ${full ? "full day" : "four hours"}`;
      break;
    }
  }

  return { selection: s, total, lines: [{ label, amount: total }], summary, hint };
}
