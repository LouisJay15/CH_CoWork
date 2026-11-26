import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Terms() {
  return (
    <Page pageKey="terms">
      <PageHeader title="Terms and house rules" />
      <section className="section section--white">
        <div className="container prose" style={{ maxWidth: "48rem" }}>
          <p>Charles Hope Cowork is operated by CHARLES HOPE SA (PTY) LTD.</p>
          <p>
            A message on WhatsApp, a phone call, an email or a request sent through this site is an enquiry, not a completed booking. A booking is confirmed when we write back to agree the dates, the rate and how to pay.
          </p>
          <p>
            By sending an enquiry you agree that we may contact you about your request and store your details for that purpose, in line with the <Link className="link" to="/privacy">privacy notice</Link> on this site.
          </p>
          <p>Please use the workspace and the hotel areas with care, and follow hotel rules on access, noise and visitors.</p>
        </div>
      </section>
    </Page>
  );
}
