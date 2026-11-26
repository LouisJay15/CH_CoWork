import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DeskCalculator from "../components/DeskCalculator.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import Photo from "../components/Photo.jsx";
import { useLastQuote } from "../lib/quoteStore.js";

export default function HotelGuests() {
  const last = useLastQuote();
  const live = last && last.page === "Hotel guests" ? last : null;
  return (
    <Page pageKey="hotelGuests" stickyTemplate="hotel-guest">
      <PageHeader eyebrow="Hotel guests" title="For guests of the Charles Hope hotel">
        <p className="lead">
          If you are staying at the Charles Hope hotel, you can use Charles Hope Cowork at the hotel guest rate of R200, with full access to the cowork amenities, except the Noah discount.
        </p>
      </PageHeader>

      <section className="section section--white" aria-labelledby="guest-rate">
        <div className="container split split--center">
          <div className="stack">
            <h2 className="h2" id="guest-rate">The guest rate</h2>
            <p>
              The hotel guest rate is R200 per day. Prices shown incl. VAT. Please book through WhatsApp or through the hotel desk, and bring your room confirmation when you arrive.
            </p>
            <div className="actions">
              <WhatsAppButton page="Hotel guests" template="hotel-guest" option={live?.summary} estimate={live?.total} label="Enquire as a hotel guest on WhatsApp" />
            </div>
          </div>
          <Photo id="lounge" tall />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="hg-calc">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" id="hg-calc">Work out your stay</h2>
          </div>
          <DeskCalculator variant="full" products={["hotel-guest"]} initial={{ product: "hotel-guest" }} />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="hg-benefits">
        <div className="container split split--center">
          <Photo id="entrance-wide" tall position="47% 45%" />
          <div className="stack">
            <h2 className="h2" id="hg-benefits">Part of the Charles Hope hotel</h2>
            <p>Charles Hope is a 41-room boutique hotel, and Noah is the on-site restaurant.</p>
            <p>
              Monthly tenants get a discount at Noah for client lunches, coffee and after-work drinks. The hotel guest cowork rate does not include the Noah discount. Ask us on WhatsApp for the current monthly-tenant discount.
            </p>
            <p>
              Corporate accommodation rates at Charles Hope are available for tenants, their clients and colleagues, or for you on a later stay. Ask us on WhatsApp for those rates.
            </p>
            <div className="actions">
              <WhatsAppButton page="Hotel guests" template="noah" label="Ask us on WhatsApp" />
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
