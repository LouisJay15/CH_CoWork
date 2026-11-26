import { useLocation } from "react-router-dom";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER_DISPLAY } from "../lib/site.js";
import { useLastQuote } from "../lib/quoteStore.js";

export default function Book() {
  const { state } = useLocation();
  const last = useLastQuote();
  const prefill = state?.selection ?? last?.selection ?? null;
  return (
    <Page pageKey="book">
      <PageHeader eyebrow="Book" title="Book a site inspection">
        <p className="lead">
          The quickest way to book a site inspection or request a quote is WhatsApp. You can also call <a className="link" href={PHONE_TEL}>{PHONE_DISPLAY}</a> or email <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>, or send a booking request below.
        </p>
        <div className="actions">
          <WhatsAppButton page="Book" option={last?.summary} estimate={last?.total} label={`Message us on WhatsApp at ${WHATSAPP_NUMBER_DISPLAY}`} />
        </div>
      </PageHeader>

      <section className="section section--white" aria-labelledby="request-heading">
        <div className="container split split--wide-left">
          <div>
            <div className="section-head">
              <h2 className="h2" id="request-heading">Send a booking request</h2>
              <p>
                Tell us the date, the desk type (Basic or Screen), and whether you want a monthly desk, a day pass, the hotel guest rate, a private workspace or a boardroom. If you want the glass meeting pod or a phone booth, say so. We will confirm availability and how to pay.
              </p>
            </div>
            <EnquiryForm page="Book" prefill={prefill} />
          </div>
          <aside className="stack" aria-label="Other ways to reach us">
            <span className="overline">Other ways to reach us</span>
            <ul className="contact-list">
              <li>
                <strong>Telephone</strong>
                <a className="link" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
            <p>Charles Hope Cowork, 81 Loop Street, 9th floor, Cape Town.</p>
            <p className="caption">A request is not a confirmed booking. A booking is confirmed when we write back to agree the dates, the rate and how to pay.</p>
          </aside>
        </div>
      </section>
    </Page>
  );
}
