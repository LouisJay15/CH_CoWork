import { Suspense, lazy, useEffect, useRef, useState } from "react";

// React Bits components load as separate chunks after the page's first paint, and the ones below
// the fold only when the visitor scrolls near them. GSAP (SplitText, FadeContent, AccordionGallery)
// is the largest dependency; BounceCards, CurvedLoop and StarBorder have none.
const SplitTextImpl = lazy(() => import("./SplitText.jsx"));
const FadeContentImpl = lazy(() => import("./FadeContent.jsx"));
const AccordionGalleryImpl = lazy(() => import("./AccordionGallery.jsx"));
const BounceCardsImpl = lazy(() => import("./BounceCards.jsx"));
const CurvedLoopImpl = lazy(() => import("./CurvedLoop.jsx"));
const StarBorderImpl = lazy(() => import("./StarBorder.jsx"));

/** Renders children once the placeholder is within `margin` of the viewport. The placeholder keeps the space. */
export function NearView({ children, margin = "400px", className = "", style }) {
  const ref = useRef(null);
  const [near, setNear] = useState(typeof IntersectionObserver === "undefined");
  useEffect(() => {
    if (near || !ref.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [near, margin]);
  return (
    <div ref={ref} className={className} style={style}>
      {near ? children : null}
    </div>
  );
}

/** React Bits SplitText. Until it loads, the heading keeps its space but stays hidden (it animates in). */
export function SplitText(props) {
  const Tag = props.tag || "p";
  return (
    <Suspense fallback={<Tag className={`split-parent ${props.className ?? ""}`} style={{ visibility: "hidden", textAlign: props.textAlign }}>{props.text}</Tag>}>
      <SplitTextImpl {...props} />
    </Suspense>
  );
}

/** React Bits FadeContent. Until it loads, content is shown as is, so nothing is ever left hidden. */
export function FadeContent({ children, className, ...props }) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <FadeContentImpl className={className} {...props}>
        {children}
      </FadeContentImpl>
    </Suspense>
  );
}

/** React Bits AccordionGallery. `fallback` is shown while it loads (same size, so nothing shifts). */
export function AccordionGallery({ fallback = null, ...props }) {
  return (
    <Suspense fallback={fallback}>
      <AccordionGalleryImpl {...props} />
    </Suspense>
  );
}

/** React Bits BounceCards. */
export function BounceCards(props) {
  return (
    <Suspense fallback={<div style={{ width: props.containerWidth, height: props.containerHeight }} />}>
      <BounceCardsImpl {...props} />
    </Suspense>
  );
}

/** React Bits CurvedLoop (the marquee). */
export function CurvedLoop(props) {
  return (
    <Suspense fallback={null}>
      <CurvedLoopImpl {...props} />
    </Suspense>
  );
}

/** React Bits StarBorder. `fallback` renders while it loads; give it the same size. */
export function StarBorder({ fallback = null, ...props }) {
  return (
    <Suspense fallback={fallback}>
      <StarBorderImpl {...props} />
    </Suspense>
  );
}
