import { PHOTOS, photoFiles } from "../lib/photos.js";

/** A labelled panel shown until the real photograph is added to public/images. */
export function PhotoPlaceholder({ id, label, alt, className = "", decorative = false, bare = false }) {
  const caption = label ?? PHOTOS[id]?.caption ?? "Photograph";
  return (
    <div
      className={`ph ${className}`}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt ?? PHOTOS[id]?.alt ?? caption })}
    >
      {!bare && <span className="ph__label">{caption}</span>}
      {!bare && <span className="ph__sub">Photo to follow</span>}
    </div>
  );
}

/** A supplied photograph (WebP with JPEG fallback) with its exact alt text. */
export default function Photo({ id, caption, priority = false, sizes = "(min-width: 960px) 50vw, 100vw", tall = false, decorative = false, className = "" }) {
  const meta = PHOTOS[id];
  const files = photoFiles(id);
  const alt = decorative ? "" : meta.alt;
  const frameClass = `photo ${tall ? "photo--tall" : ""} ${className}`;
  const media = files ? (
    <picture>
      {files.webp && <source type="image/webp" srcSet={files.webp} sizes={sizes} />}
      <img
        src={files.src}
        alt={alt}
        width={files.width}
        height={files.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : undefined}
        style={meta.objectPosition ? { objectPosition: meta.objectPosition } : undefined}
      />
    </picture>
  ) : (
    <PhotoPlaceholder id={id} decorative={decorative} />
  );
  if (!caption) return <div className={frameClass}>{media}</div>;
  return (
    <figure className="photo-figure">
      <div className={frameClass}>{media}</div>
      <figcaption className="caption">{caption === true ? meta.caption : caption}</figcaption>
    </figure>
  );
}
