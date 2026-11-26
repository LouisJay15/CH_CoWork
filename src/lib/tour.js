import { FRAMES } from "./frames.js";

// Home scroll tour: seven scenes in the order requested, each built from consecutive stills
// that zoom, pan and blend into one another (Ken Burns). `heading` and `line` are public copy.
export const SCENES = [
  { id: "entrance", heading: "Arrive at Charles Hope", line: "Take the lift to the 9th floor at 81 Loop Street.", frames: ["entrance-wide", "entrance-logo"] },
  { id: "signage", heading: "Live. Work. Stay.", line: "Charles Hope Cowork sits inside Charles Hope, a 41-room boutique hotel.", frames: ["lws-wide", "lws-close"] },
  { id: "boardroom", heading: "Three boardrooms", line: "Book a boardroom for four hours or a full day, by time slot on WhatsApp.", frames: ["corridor", "boardroom-door", "boardroom"] },
  { id: "open", heading: "The open space", line: "Choose a Basic desk, or a Screen desk with two monitors. Coffee is included.", frames: ["open-1", "open-2"] },
  { id: "pods", heading: "Two call pods", line: "Private phone booths, included in the desk rates. Book a time slot on WhatsApp.", frames: ["pod-door", "pod-inside"] },
  { id: "kitchen", heading: "The kitchen", line: "A shared kitchen and lounge on the floor, with city views.", frames: ["lounge", "kitchen-1", "kitchen-2"] },
  { id: "view", heading: "Devil's Peak and Table Mountain", line: "The view from the 9th floor, across the city to the mountain.", frames: ["view-1", "view-2"] },
];

/** Every frame in order, with the scene it belongs to. */
export const TOUR_FRAMES = SCENES.flatMap((scene, s) => scene.frames.map((id) => ({ id, scene: s })));

/** The frame shown for a scene when motion is reduced (its last, closest shot). */
export const keyFrame = (scene) => scene.frames[scene.frames.length - 1];

export function tourIsValid() {
  return TOUR_FRAMES.every((f) => FRAMES[f.id]);
}
