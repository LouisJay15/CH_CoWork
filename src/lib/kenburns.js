// Scroll-driven Ken Burns: stills that zoom and pan toward their subject, then blend into the next.
// g is the scroll position in frames (0 = first frame, 1 = second frame fully in, and so on).

export const FADE = 0.45; // how much of each step is spent blending into the next frame

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);

/** Opacity (stacked: later frames sit on top) and motion progress for frame i. */
export function frameState(g, i) {
  const opacity = i === 0 ? 1 : smooth(clamp01((g - (i - FADE)) / FADE));
  const t = clamp01((g - (i - FADE)) / (1 + FADE));
  return { opacity, t };
}

/** Interpolate a [x, y, zoom] move with gentle easing. */
export function move(from, to, t) {
  const e = smooth(t);
  return [from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e, from[2] + (to[2] - from[2]) * e];
}

/**
 * Size and position for an image covering a stage, centred on a focal point and zoomed,
 * never showing past its edges. Returns CSS pixel values for width/height and a transform.
 */
export function cover(stageW, stageH, imgAspect, [fx, fy, zoom]) {
  let w = stageW;
  let h = stageW / imgAspect;
  if (h < stageH) {
    h = stageH;
    w = stageH * imgAspect;
  }
  const W = w * zoom;
  const H = h * zoom;
  const tx = Math.min(0, Math.max(stageW - W, stageW / 2 - fx * W));
  const ty = Math.min(0, Math.max(stageH - H, stageH / 2 - fy * H));
  return { w, h, tx, ty, zoom };
}

/** Scroll position (frames) from the scenes container's top edge, in px. */
export function scrollToFrame(top, viewport, span, count, lead = 0) {
  return Math.min(count - 1, Math.max(0, (-top + lead * viewport) / span));
}
