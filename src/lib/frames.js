import manifest from "../media/manifest.json";
import { asset } from "./site.js";

/** Photographs made by `npm run media` (see scripts/build-media.mjs and docs/media-sources.md). */
export const FRAMES = manifest.frames;

export function frame(id) {
  const f = FRAMES[id];
  if (!f) throw new Error(`Unknown photo: ${id}`);
  return f;
}

const base = (id, variant) => (variant === "tall" ? `${id}-tall` : id);

/** srcset for one variant ("wide" or "tall") in one format ("avif" or "webp"). */
export function srcSet(id, variant = "wide", format = "avif") {
  const v = frame(id)[variant];
  return v.widths.map((w) => `${asset(`media/frames/${base(id, variant)}-${w}.${format}`)} ${w}w`).join(", ");
}

/** A single file, for <img src> fallbacks and previews. */
export function src(id, variant = "wide", width = 1200, format = "webp") {
  const v = frame(id)[variant];
  const w = v.widths.includes(width) ? width : v.widths[v.widths.length - 1];
  return asset(`media/frames/${base(id, variant)}-${w}.${format}`);
}

export function aspect(id, variant = "wide") {
  const v = frame(id)[variant] ?? frame(id).wide;
  return v.w / v.h;
}
