export default function Section({ tone = "white", id, labelledBy, className = "", children }) {
  const dark = tone === "deep";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section section--${tone} ${dark ? "on-dark" : ""} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}
