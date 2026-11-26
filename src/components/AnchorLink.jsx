import { scrollToId } from "../lib/anchor.js";

/** An in-page link that also works with hash routing. */
export default function AnchorLink({ to, children, onClick, ...rest }) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        scrollToId(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
