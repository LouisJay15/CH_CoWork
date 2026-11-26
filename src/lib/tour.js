// Home scroll tour stops (plan section 6.19). `heading` and `line` are final copy.
// `time` is the second in public/video/cowork-tour.mp4 at which that area is centred on screen.
// Fill in every time from the cut. Until they are all set and strictly increasing, the tour uses the photographs.
export const TOUR_STOPS = [
  { id: "entrance", photo: "01-entrance-live-work-stay", heading: "Arrive on the 9th floor", line: "Take the lift to the 9th floor at 81 Loop Street.", time: 0 },
  { id: "reception", photo: "07-reception-charleshope-wall", heading: "Reception", line: "Charles Hope Cowork sits inside Charles Hope, a 41-room boutique hotel.", time: 0 },
  { id: "desks", photo: "05-open-plan-desks", heading: "Open-plan desks", line: "Choose a Basic desk, or a Screen desk with two monitors. Coffee is included.", time: 0 },
  { id: "boardrooms", photo: "02-meeting-room-screen", heading: "Three boardrooms", line: "Book a boardroom for four hours or a full day, by time slot on WhatsApp.", time: 0 },
  { id: "pod", photo: "03-glass-meeting-pod", heading: "Glass meeting pod", line: "Included in the desk rates. Book a time slot on WhatsApp.", time: 0 },
  { id: "booths", photo: "04-phone-booths", heading: "Phone booths", line: "For calls, included in the desk rates. Book a time slot on WhatsApp.", time: 0 },
  { id: "lounge", photo: "06-lounge-city-view", heading: "Lounge with city views", line: "Part of the floor, open to everyone working here.", time: 0 },
];

export function tourTimesValid(stops = TOUR_STOPS) {
  return stops.every((s, i) => Number.isFinite(s.time) && (i === 0 ? s.time >= 0 : s.time > stops[i - 1].time));
}

/**
 * Piecewise mapping from stop positions to clip time.
 * @param {number[]} centres  each stop block's centre, in viewport pixels
 * @param {number} viewportCentre
 * @param {number[]} times  stop times in seconds
 * @param {number} duration  clip length in seconds
 * @param {number} span  scroll distance used before the first and after the last stop
 */
export function scrollToTime(centres, viewportCentre, times, duration, span) {
  const n = centres.length;
  const c = viewportCentre;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  if (c <= centres[0]) return times[0] * clamp01(1 - (centres[0] - c) / span);
  if (c >= centres[n - 1]) return times[n - 1] + (duration - times[n - 1]) * clamp01((c - centres[n - 1]) / span);
  for (let i = 0; i < n - 1; i++) {
    if (c >= centres[i] && c <= centres[i + 1]) {
      const f = (c - centres[i]) / (centres[i + 1] - centres[i] || 1);
      return times[i] + f * (times[i + 1] - times[i]);
    }
  }
  return 0;
}
