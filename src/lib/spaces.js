// The spaces on the Home gallery (React Bits AccordionGallery), in the order agreed for the floor:
// entrance, Live. Work. Stay., boardroom, open space, call pods, kitchen, and the view.
// photo: an id in src/media/manifest.json (made by `npm run media`, see docs/media-sources.md).
export const SPACES = [
  { key: "entrance", photo: "space-entrance", label: "Arrive on the 9th floor" },
  { key: "live-work-stay", photo: "space-lws", label: "Live. Work. Stay." },
  { key: "boardroom-hall", photo: "space-boardroom-hall", label: "Three boardrooms" },
  { key: "boardroom", photo: "space-boardroom", label: "Inside a boardroom" },
  { key: "open-plan", photo: "space-open", label: "Open-plan desks" },
  { key: "call-pods", photo: "space-callpods", label: "Two call pods" },
  { key: "lounge", photo: "space-lounge", label: "Lounge and kitchen" },
  { key: "terrace", photo: "space-terrace", label: "Table Mountain from the terrace" },
];

// The photos on the Home hotel section (React Bits BounceCards).
export const HOTEL_CARDS = ["lws-close", "lounge", "space-terrace", "kitchen-2", "kitchen-1"];
