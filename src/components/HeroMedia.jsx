import { src, srcSet } from "../lib/frames.js";

// The entrance: the CharlesHope sign on the timber wall. Preloaded in index.html.
const HERO = "entrance-wide";
const SIZES = "(orientation: portrait) 72vh, 100vw";

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
