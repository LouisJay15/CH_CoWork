import { useEffect, useRef, useState } from "react";
import { MAPS_EMBED_URL, MAPS_SEARCH_URL } from "../lib/site.js";

/** Google Maps by address only (no invented coordinates). Loads when near the viewport. */
export default function MapEmbed() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) setShow(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <figure>
      <div className="map" ref={ref}>
        {show ? (
          <iframe title="Map of 81 Loop Street, Cape Town" src={MAPS_EMBED_URL} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
        ) : (
          <div className="map__placeholder">Map of 81 Loop Street, Cape Town</div>
        )}
      </div>
      <figcaption className="caption" style={{ marginTop: 8 }}>
        81 Loop Street, 9th floor, Cape Town.{" "}
        <a className="link" href={MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
