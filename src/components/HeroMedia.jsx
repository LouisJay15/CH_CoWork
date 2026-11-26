import { src, srcSet } from "../lib/frames.js";

// The first frame of the scroll tour, so the hero flows straight into the tour (and it is already loaded).
const HERO = "entrance-wide";
const SIZES = "(orientation: portrait) 134vh, 100vw";

/** Home hero still: decorative behind the heading, and the page's LCP image. No video. */
export default function HeroMedia() {
  return (
    <div className="hero__media">
      <picture>
        <source type="image/avif" srcSet={srcSet(HERO, "wide", "avif")} sizes={SIZES} />
        <img src={src(HERO, "wide", 1200, "webp")} srcSet={srcSet(HERO, "wide", "webp")} sizes={SIZES} alt="" width="1600" height="1200" loading="eager" fetchpriority="high" decoding="async" />
      </picture>
      <div className="hero__overlay" />
    </div>
  );
}
