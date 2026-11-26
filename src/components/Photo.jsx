import { frame, src, srcSet } from "../lib/frames.js";

/** Panel for a photo that has not been supplied yet (only the glass meeting pod at the moment). */
export function PhotoPlaceholder({ label = "Photograph", className = "" }) {
  return (
    <div className={`ph ${className}`} role="img" aria-label={`${label}: photograph to follow`}>
      <span className="ph__label">{label}</span>
      <span className="ph__sub">Photo to follow</span>
    </div>
  );
}

/**
 * A photograph from src/media/manifest.json: AVIF with a WebP fallback, responsive sizes,
 * lazy unless it is the main image, fixed aspect ratio so nothing shifts while it loads.
 */
export default function Photo({ id, caption, priority = false, sizes = "(min-width: 960px) 50vw, 100vw", tall = false, decorative = false, className = "", position }) {
  const f = frame(id);
  const media = (
    <picture>
      <source type="image/avif" srcSet={srcSet(id, "wide", "avif")} sizes={sizes} />
      <img
        src={src(id, "wide", 1200, "webp")}
        srcSet={srcSet(id, "wide", "webp")}
        sizes={sizes}
        alt={decorative ? "" : f.alt}
        width={f.wide.w}
        height={f.wide.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : undefined}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
  const frameClass = `photo ${tall ? "photo--tall" : ""} ${className}`;
  if (!caption) return <div className={frameClass}>{media}</div>;
  return (
    <figure className="photo-figure">
      <div className={frameClass}>{media}</div>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  );
}
