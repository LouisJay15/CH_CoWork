import { AccordionGallery, NearView } from "../reactbits/lazy.jsx";
import { SPACES } from "../lib/spaces.js";
import { frame, src } from "../lib/frames.js";
import { useIsDesktop, useMediaQuery } from "../lib/media.js";

/**
 * The 9th floor as an expanding photo gallery (React Bits AccordionGallery).
 * Desktop: a row of photos; hover or focus one to open it. Phone: a stack; tap one to open it.
 * Loads (script and photos) only when the visitor scrolls near it.
 */
export default function FloorGallery() {
  const desktop = useIsDesktop();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const items = SPACES.map((s) => ({ image: src(s.photo, "wide", 1200, "webp"), label: s.label, alt: frame(s.photo).alt }));
  const height = desktop ? 520 : 680;

  return (
    <NearView className="floor-gallery" margin="100px" style={{ "--floor-h": `${height}px` }}>
      <AccordionGallery
        key={desktop ? "row" : "stack"}
        items={items}
        defaultIndex={0}
        orientation={desktop ? "horizontal" : "vertical"}
        trigger={canHover ? "hover" : "click"}
        height={desktop ? height : height / 1.6}
        gap={8}
        radius={8}
        expandRatio={desktop ? 0.5 : 0.56}
        tilt={desktop ? 6 : 0}
        parallax={0.5}
        grayscale={false}
        accentColor="#F8706B"
        overlayColor="#194049"
        textColor="#FFFFFF"
        fallback={<div className="floor-gallery__wait" />}
      />
    </NearView>
  );
}
