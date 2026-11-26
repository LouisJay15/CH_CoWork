import { useState } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import RateTable from "../components/RateTable.jsx";
import Photo from "../components/Photo.jsx";
import DeskCalculator, { QuoteReporter } from "../components/DeskCalculator.jsx";
import FindYourSetup from "../components/FindYourSetup.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { DEFAULT_SELECTION, estimate } from "../lib/calculator.js";

export default function DesksPricing() {
  const [selection, setSelection] = useState(DEFAULT_SELECTION);
  const [touched, setTouched] = useState(false);
  const onChange = (next) => {
    setSelection(next);
    setTouched(true);
  };
  const e = touched ? estimate(selection) : null;

  return (
    <Page pageKey="desks">
      <QuoteReporter selection={selection} touched={touched} />
      <PageHeader eyebrow="Rates" title="Desks and pricing">
        <p className="lead">
          Two desk types. Monthly rates are for a hot desk, billed month to month, with no minimum term. Day rates apply if you are not on a monthly plan.
        </p>
      </PageHeader>

      <section className="section section--white" aria-labelledby="desks-heading">
        <div className="container split">
          <div className="stack" style={{ "--stack": "20px" }}>
            <h2 className="h2" id="desks-heading">Desks</h2>
            <RateTable
              columns={["Desk", "Monthly", "Day rate (if not monthly)"]}
              rows={[
                ["Basic desk", "R3,000 per month", "R280 per day"],
                ["Screen desk", "R3,750 per month", "R350 per day"],
              ]}
              note="Prices are quoted per desk. Please ask if you need a tax invoice."
            />
            <p>A Screen desk is a Basic desk with two monitors.</p>
            <p>
              What is included: a desk and chair, power, Wi-Fi, coffee, and access to the shared workspace. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, and are booked by time slot on WhatsApp. The boardrooms are charged separately (see rates below). Printing is available on request. The lounge is part of the floor (see <Link className="link" to="/amenities">Amenities</Link>).
            </p>
            <p>
              <Link className="link" to="/hotel-guests">Hotel guests see the Hotel guests page for the R200 guest rate.</Link>
            </p>
          </div>
          <Photo id="05-open-plan-desks" tall />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="rooms-heading">
        <div className="container split">
          <div className="stack" style={{ "--stack": "20px" }}>
            <h2 className="h2" id="rooms-heading">Rooms and private workspace</h2>
            <p>
              There are three boardrooms. Tenants and day guests can book a time slot for a boardroom, the glass meeting pod or a phone booth. Ask on WhatsApp to check a time. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate. There is no separate charge for those rooms. Boardrooms are charged separately.
            </p>
            <RateTable
              columns={["Room", "Rate"]}
              rows={[
                ["Private workspace", "R450 per day"],
                ["Boardroom, four hours", "R1,500"],
                ["Boardroom, full day", "R4,000"],
              ]}
            />
            <div className="actions">
              <WhatsAppButton page="Desks and pricing" template="room" room="boardroom" label="Check a time on WhatsApp" />
            </div>
          </div>
          <Photo id="02-meeting-room-screen" tall />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="fys-heading">
        <div className="container">
          <div className="section-head">
            <span className="overline">Three questions</span>
            <h2 className="h2" id="fys-heading">Find your setup</h2>
            <p>Answer three short questions and we will show an estimated total. You can adjust it in the calculator.</p>
          </div>
          <FindYourSetup value={selection} onChange={onChange} calculatorId="calculator" />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="calc-heading">
        <div className="container">
          <div className="section-head">
            <span className="overline">Calculator</span>
            <h2 className="h2" id="calc-heading">How many desks do you need?</h2>
          </div>
          <DeskCalculator id="calculator" variant="full" value={selection} onChange={onChange} />
        </div>
      </section>

      <section className="section section--deep section--close on-dark" aria-labelledby="desks-close">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" id="desks-close">Come and see the desks</h2>
            <p className="lead">Message us to book a site inspection and request a quote.</p>
          </div>
          <div className="actions">
            <WhatsAppButton page="Desks and pricing" option={e?.summary} estimate={e?.total} label="Book a site inspection on WhatsApp" />
            <Link to="/book" className="btn btn--on-dark">Send a booking request</Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
