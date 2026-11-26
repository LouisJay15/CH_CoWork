import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";

export default function NotFound() {
  return (
    <Page pageKey="home">
      <section className="section section--light" style={{ paddingTop: "calc(var(--header-h) + 64px)" }}>
        <div className="container center-block stack">
          <h1 className="h1">Page not found</h1>
          <p>That page does not exist.</p>
          <p>
            <Link className="btn btn--primary" to="/">Go to the home page</Link>
          </p>
        </div>
      </section>
    </Page>
  );
}
