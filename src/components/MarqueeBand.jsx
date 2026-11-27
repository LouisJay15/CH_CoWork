import { CurvedLoop, NearView } from "../reactbits/lazy.jsx";
import { useIsDesktop } from "../lib/media.js";

/**
 * "Live. Work. Stay." scrolling across a navy band (React Bits CurvedLoop). Visitors can drag it.
 * Decorative: the same words are on the page as text, so screen readers skip it.
 */
export default function MarqueeBand() {
  const desktop = useIsDesktop();
  return (
    <div className="marquee on-dark" aria-hidden="true">
      <NearView className="marquee__inner" margin="200px">
        <CurvedLoop
          marqueeText="Live. Work. Stay."
          separator="✦"
          separatorColor="#F8706B"
          color="#F7F4EF"
          shape="wave"
          curveAmount={desktop ? 80 : 90}
          fontSize={desktop ? 64 : 150}
          fontWeight={400}
          letterSpacing={desktop ? 6 : 8}
          speed={desktop ? 1.2 : 1.6}
          edgeFade={0.12}
          className="marquee__text"
        />
      </NearView>
    </div>
  );
}
