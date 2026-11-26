import { describe, expect, it } from "vitest";
import { estimate, formatRand, normalize, DAY_PASS_HINTS } from "./calculator.js";

const hd = (deskType, term, desks, days = 1) => ({ product: "hot-desk", deskType, term, desks, days });

// Plan section 8.5, T1 to T22.
const cases = [
  ["T1", hd("basic", "monthly", 1), 3000, "R3,000"],
  ["T2", hd("screen", "monthly", 1), 3750, "R3,750"],
  ["T3", hd("screen", "monthly", 3), 11250, "R11,250"],
  ["T4", hd("basic", "monthly", 20), 60000, "R60,000"],
  ["T5", hd("screen", "monthly", 20), 75000, "R75,000"],
  ["T6", hd("basic", "day-pass", 2, 3), 1680, "R1,680"],
  ["T7", hd("basic", "day-pass", 1, 1), 280, "R280"],
  ["T8", hd("screen", "day-pass", 1, 1), 350, "R350"],
  ["T9", hd("basic", "day-pass", 1, 10), 2800, "R2,800"],
  ["T10", hd("basic", "day-pass", 1, 11), 3080, "R3,080"],
  ["T11", hd("screen", "day-pass", 1, 10), 3500, "R3,500"],
  ["T12", hd("screen", "day-pass", 1, 11), 3850, "R3,850"],
  ["T13", hd("basic", "day-pass", 2, 11), 6160, "R6,160"],
  ["T14", { product: "hotel-guest", desks: 1, days: 2 }, 400, "R400"],
  ["T15", { product: "hotel-guest", desks: 2, days: 1 }, 400, "R400"],
  ["T16", { product: "hotel-guest", desks: 1, days: 1 }, 200, "R200"],
  ["T17", { product: "private-workspace", desks: 3, days: 1 }, 450, "R450"],
  ["T18", { product: "private-workspace", days: 5 }, 2250, "R2,250"],
  ["T19", { product: "boardroom", boardroomLength: "four-hours", slots: 1 }, 1500, "R1,500"],
  ["T20", { product: "boardroom", boardroomLength: "four-hours", slots: 2 }, 3000, "R3,000"],
  ["T21", { product: "boardroom", boardroomLength: "full-day", slots: 1 }, 4000, "R4,000"],
  ["T22", { product: "boardroom", boardroomLength: "full-day", slots: 2 }, 8000, "R8,000"],
];

describe("estimate: test cases T1 to T22", () => {
  it.each(cases)("%s", (_id, input, total, formatted) => {
    const e = estimate(input);
    expect(e.total).toBe(total);
    expect(formatRand(e.total)).toBe(formatted);
  });
});

describe("day-pass crossover hint", () => {
  it("T9: no hint at 10 Basic days", () => expect(estimate(hd("basic", "day-pass", 1, 10)).hint).toBeNull());
  it("T10: Basic hint at 11 days", () => expect(estimate(hd("basic", "day-pass", 1, 11)).hint).toBe(DAY_PASS_HINTS.basic));
  it("T11: no hint at 10 Screen days", () => expect(estimate(hd("screen", "day-pass", 1, 10)).hint).toBeNull());
  it("T12: Screen hint at 11 days", () => expect(estimate(hd("screen", "day-pass", 1, 11)).hint).toBe(DAY_PASS_HINTS.screen));
  it("T13: hint compares the same desk count", () => expect(estimate(hd("basic", "day-pass", 2, 11)).hint).toBe(DAY_PASS_HINTS.basic));
  it("no hint on a monthly desk", () => expect(estimate(hd("basic", "monthly", 1)).hint).toBeNull());
});

describe("edge cases E1 to E10", () => {
  it("E1: desks 0 or empty clamp to 1", () => {
    expect(normalize({ desks: 0 }).desks).toBe(1);
    expect(normalize({ desks: "" }).desks).toBe(1);
  });
  it("E2: desks 21 clamps to 20", () => expect(normalize({ desks: 21 }).desks).toBe(20));
  it("E3: desks 2.6 rounds to 3", () => expect(normalize({ desks: 2.6 }).desks).toBe(3));
  it("E4: desks 20.4 rounds to 20", () => expect(normalize({ desks: 20.4 }).desks).toBe(20));
  it("E5: days 0 or empty clamp to 1", () => {
    expect(normalize({ days: 0 }).days).toBe(1);
    expect(normalize({ days: "" }).days).toBe(1);
  });
  it("E6: days -3 clamps to 1", () => expect(normalize({ days: -3 }).days).toBe(1));
  it("E7: slots 0 clamps to 1", () => expect(normalize({ slots: 0 }).slots).toBe(1));
  it("E8: 5 desks monthly to private workspace, 1 day is R450", () => {
    const before = { ...hd("basic", "monthly", 5) };
    expect(estimate({ ...before, product: "private-workspace", days: 1 }).total).toBe(450);
  });
  it("E9: back to 5 Basic monthly is R15,000", () => {
    expect(estimate({ product: "hot-desk", deskType: "basic", term: "monthly", desks: 5, days: 1 }).total).toBe(15000);
  });
  it("E10: VAT is never added", () => expect(formatRand(estimate(hd("screen", "monthly", 3)).total)).toBe("R11,250"));
  it("never returns NaN", () => {
    const e = estimate({ product: "hot-desk", term: "day-pass", desks: "abc", days: undefined });
    expect(Number.isNaN(e.total)).toBe(false);
    expect(e.total).toBe(280);
  });
  it("no 30-day cap on days", () => expect(estimate({ product: "private-workspace", days: 45 }).total).toBe(20250));
});

describe("summary sentences (plan section 8.4)", () => {
  it.each([
    [hd("basic", "monthly", 1), "1 Basic desk, monthly"],
    [hd("screen", "monthly", 3), "3 Screen desks, monthly"],
    [hd("basic", "day-pass", 2, 3), "2 Basic desks, day pass, 3 days"],
    [{ product: "hotel-guest", desks: 1, days: 2 }, "1 hotel guest desk, 2 days"],
    [{ product: "private-workspace", days: 1 }, "1 private workspace, 1 day"],
    [{ product: "boardroom", boardroomLength: "four-hours", slots: 1 }, "1 boardroom slot, four hours"],
    [{ product: "boardroom", boardroomLength: "full-day", slots: 2 }, "2 boardroom slots, full day"],
  ])("%o", (input, summary) => expect(estimate(input).summary).toBe(summary));
});
