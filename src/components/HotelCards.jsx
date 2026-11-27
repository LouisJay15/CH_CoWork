import { useEffect, useRef, useState } from "react";
import { BounceCards, NearView } from "../reactbits/lazy.jsx";
import { HOTEL_CARDS } from "../lib/spaces.js";
import { frame, src } from "../lib/frames.js";

/**
 * A fan of photos that bounce in and part when you point at one (React Bits BounceCards).
 * Sized to its column, so it fits a phone and a desktop.
 */
export default function HotelCards() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const card = Math.round(Math.min(220, Math.max(112, width / 2.5)));
  const spread = Math.round(((width - card) / (HOTEL_CARDS.length - 1)) * 0.92);
  const height = Math.round(card * 1.45);
  const images = HOTEL_CARDS.map((id) => ({ src: src(id, "wide", 640, "webp"), alt: frame(id).alt }));

  return (
    <div ref={ref} className="hotel-cards" style={{ height }}>
      {width > 0 && (
        <NearView margin="0px">
          <BounceCards
            images={images}
            containerWidth={width}
            containerHeight={height}
            cardSize={card}
            spread={spread}
            rotation={9}
            arc={card * 0.12}
            animationDelay={0.15}
            animationStagger={0.08}
            pushDistance={Math.round(card * 0.55)}
            borderWidth={4}
            borderColor="#FFFFFF"
            radius={8}
          />
        </NearView>
      )}
    </div>
  );
}
