import { photoFiles, posterFiles } from "../lib/photos.js";
import { PhotoPlaceholder } from "./Photo.jsx";

/** Home hero still: the tour poster, else photo 01, else a branded panel. Decorative behind the heading. No video. */
export default function HeroMedia() {
  const files = posterFiles() ?? photoFiles("01-entrance-live-work-stay");
  return (
    <div className="hero__media">
      {files ? (
        <picture>
          {files.webp && <source type="image/webp" srcSet={files.webp} />}
          <img src={files.src} alt="" width={files.width} height={files.height} loading="eager" fetchpriority="high" decoding="async" />
        </picture>
      ) : (
        <PhotoPlaceholder id="01-entrance-live-work-stay" decorative bare />
      )}
      <div className="hero__overlay" />
    </div>
  );
}
