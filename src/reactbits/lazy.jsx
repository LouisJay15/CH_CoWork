import { Suspense, lazy } from "react";

// GSAP (needed by SplitText and FadeContent) is the largest dependency, so these React Bits
// components load as a separate chunk after the page's first paint.
const SplitTextImpl = lazy(() => import("./SplitText.jsx"));
const FadeContentImpl = lazy(() => import("./FadeContent.jsx"));

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
