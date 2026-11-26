import { describe, expect, it } from "vitest";
import { cover, frameState, move, scrollToFrame, FADE } from "./kenburns.js";
import { SCENES, TOUR_FRAMES, tourIsValid } from "./tour.js";
import { FRAMES } from "./frames.js";

describe("Ken Burns timing", () => {
  it("first frame is always opaque; later frames fade in before their turn", () => {
    expect(frameState(0, 0).opacity).toBe(1);
    expect(frameState(0, 1).opacity).toBe(0);
    expect(frameState(1 - FADE / 2, 1).opacity).toBeCloseTo(0.5, 5);
    expect(frameState(1, 1).opacity).toBe(1);
  });
  it("motion runs from the start of the fade to the next frame's arrival", () => {
    expect(frameState(1 - FADE, 1).t).toBe(0);
    expect(frameState(2, 1).t).toBe(1);
  });
  it("easing reaches both ends", () => {
    expect(move([0, 0, 1], [1, 1, 2], 0)).toEqual([0, 0, 1]);
    expect(move([0, 0, 1], [1, 1, 2], 1)).toEqual([1, 1, 2]);
  });
});

describe("cover", () => {
  it("fills a portrait phone with a 4:3 photo and never shows an edge", () => {
    const c = cover(390, 844, 4 / 3, [0.5, 0.5, 1]);
    expect(c.h).toBe(844);
    expect(c.w).toBeCloseTo(1125.3, 1);
    for (const fx of [0, 0.5, 1]) {
      const p = cover(390, 844, 4 / 3, [fx, 0.5, 1.2]);
      expect(p.tx).toBeLessThanOrEqual(0);
      expect(p.tx + p.w * p.zoom).toBeGreaterThanOrEqual(390 - 1e-9);
      expect(p.ty + p.h * p.zoom).toBeGreaterThanOrEqual(844 - 1e-9);
    }
  });
  it("fills a desktop stage with the width", () => {
    const c = cover(1440, 900, 4 / 3, [0.5, 0.5, 1]);
    expect(c.w).toBe(1440);
    expect(c.h).toBe(1080);
  });
});

describe("scroll position", () => {
  it("clamps to the frame range", () => {
    expect(scrollToFrame(1000, 800, 400, 16)).toBe(0);
    expect(scrollToFrame(-100000, 800, 400, 16)).toBe(15);
    expect(scrollToFrame(-800, 800, 400, 16)).toBeCloseTo(2, 5);
    expect(scrollToFrame(-800, 800, 400, 16, 0.5)).toBeCloseTo(3, 5);
  });
});

describe("tour content", () => {
  it("has seven scenes in the requested order, every frame built", () => {
    expect(SCENES.map((s) => s.id)).toEqual(["entrance", "signage", "boardroom", "open", "pods", "kitchen", "view"]);
    expect(tourIsValid()).toBe(true);
    expect(TOUR_FRAMES).toHaveLength(16);
  });
  it("every photo has alt text and a recorded Drive source", () => {
    for (const [id, f] of Object.entries(FRAMES)) {
      expect(f.alt.length, id).toBeGreaterThan(10);
      expect(f.source.driveId, id).toBeTruthy();
    }
  });
  it("no copy uses an en or em dash", () => {
    const text = JSON.stringify(SCENES) + JSON.stringify(Object.values(FRAMES).map((f) => f.alt));
    expect(/[–—]/.test(text)).toBe(false);
  });
});
