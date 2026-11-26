import assets from "../generated/assets.json";
import { asset } from "./site.js";

// Alt text is exact (plan section 10.1). Captions are short place names only.
export const PHOTOS = {
  "01-entrance-live-work-stay": {
    alt: "Entrance to Charles Hope Cowork, with a timber wall reading Live Work Stay and a glass door into the workspace",
    caption: "Entrance",
  },
  "02-meeting-room-screen": {
    alt: "Boardroom at Charles Hope Cowork with a wall-mounted screen, a timber table and eight chairs",
    caption: "Boardroom",
  },
  "03-glass-meeting-pod": {
    alt: "Glass meeting pod at Charles Hope Cowork, seen from the open-plan desks",
    caption: "Glass meeting pod",
  },
  "04-phone-booths": { alt: "Two timber and glass phone booths on the cowork floor", caption: "Phone booths" },
  "05-open-plan-desks": {
    alt: "Open-plan desks at Charles Hope Cowork, with timber benches, black chairs and a wall of windows",
    caption: "Open-plan desks",
    objectPosition: "30% 50%", // crop away from the fire equipment on the right
  },
  "06-lounge-city-view": {
    alt: "Lounge at Charles Hope Cowork with timber walls, a long table and city views",
    caption: "Lounge",
  },
  "07-reception-charleshope-wall": {
    alt: "Reception at Charles Hope Cowork, with a timber wall reading CharlesHope, a desk and a computer",
    caption: "Reception",
  },
};

/** The files that exist for a photograph, or null if it has not been supplied yet. */
export function photoFiles(id) {
  const entry = assets.images?.[id];
  if (!entry) return null;
  return {
    src: asset(`images/${entry.file}`),
    webp: entry.webp ? asset(`images/${id}.webp`) : null,
    width: entry.width ?? 1792,
    height: entry.height ?? 1008,
  };
}

export function posterFiles() {
  const p = assets.poster;
  if (!p) return null;
  return {
    src: asset(`video/${p.file}`),
    webp: p.webp ? asset("video/cowork-tour-poster.webp") : null,
    width: p.width ?? 1280,
    height: p.height ?? 720,
  };
}

export const TOUR_VIDEO = assets.tourVideo ? asset("video/cowork-tour.mp4") : null;
