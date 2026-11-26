export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-head">
      <div className="container">
        <div className="page-head__inner">
          {eyebrow && <span className="overline">{eyebrow}</span>}
          <h1 className="h1">{title}</h1>
          {children}
        </div>
      </div>
    </header>
  );
}
