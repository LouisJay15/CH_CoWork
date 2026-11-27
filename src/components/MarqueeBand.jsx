import { CurvedLoop, NearView } from "../reactbits/lazy.jsx";
import { useFinePointer } from "../lib/media.js";

const WORDS = "Live. Work. Stay.";

/**
 * "Live. Work. Stay." scrolling across a navy band.
 * Computer: React Bits CurvedLoop, which visitors can drag.
 * Phone and tablet: a plain sliding strip the browser moves on the graphics chip, with no script running every
 * frame, because redrawing curved text 60 times a second overloads phones (Safari can reload the page).
 * Decorative: the same words are on the page as text, so screen readers skip it.
 */
export default function MarqueeBand() {
  const fine = useFinePointer();
  return (
    <div className="marquee on-dark" aria-hidden="true">
      {fine ? (
        <NearView className="marquee__inner" margin="200px">
          <CurvedLoop
            marqueeText={WORDS}
            separator="✦"
            separatorColor="#F8706B"
            color="#F7F4EF"
            shape="wave"
            curveAmount={80}
            fontSize={64}
            fontWeight={400}
            letterSpacing={6}
            speed={1.2}
            edgeFade={0.12}
            className="marquee__text"
          />
        </NearView>
      ) : (
        <div className="marquee__inner marquee__strip">
          <div className="marquee__track">
            {[0, 1].map((half) => (
              <span key={half} className="marquee__run">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="marquee__item">
                    {WORDS}
                    <span className="marquee__mark">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
