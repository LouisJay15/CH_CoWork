import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DeskCalculator from "../components/DeskCalculator.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import Photo from "../components/Photo.jsx";
import { useLastQuote } from "../lib/quoteStore.js";

export default function DayPass() {
  const last = useLastQuote();
  const live = last && last.page === "Day pass" ? last : null;
  return (
    <Page pageKey="dayPass" stickyTemplate="day-pass">
      <PageHeader eyebrow="One day at a time" title="Day pass">
        <p className="lead">If you do not need a monthly desk, you can book a day pass.</p>
      </PageHeader>

      <section className="section section--white" aria-label="Day pass rates">
        <div className="container split">
          <div className="prose">
            <ul>
              <li>Basic desk: R280 per day</li>
              <li>Screen desk: R350 per day</li>
            </ul>
            <p>Prices are quoted per desk. Prices shown incl. VAT.</p>
            <p>A day pass is for a single date. Please book before you arrive so a desk can be held for you.</p>
            <p>Payment is arranged when the booking is confirmed, after you message us on WhatsApp or send a booking request.</p>
            <p className="note">
              11 or more Basic day passes (R3,080 for 11 days, one desk) cost more than a Basic monthly desk at R3,000. Ask us which option fits.
            </p>
            <div className="actions">
              <WhatsAppButton page="Day pass" template="day-pass" option={live?.summary} estimate={live?.total} label="Book a day pass on WhatsApp" />
              <Link className="link link-arrow" to="/desks-and-pricing">
                See monthly desks
              </Link>
            </div>
          </div>
          <Photo id="05-open-plan-desks" tall />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="dp-calc">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" id="dp-calc">Work out your day pass</h2>
          </div>
          <DeskCalculator variant="full" products={["hot-desk"]} initial={{ term: "day-pass" }} showTerm={false} />
        </div>
      </section>
    </Page>
  );
}
