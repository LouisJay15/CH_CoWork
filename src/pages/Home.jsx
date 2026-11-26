import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import HeroMedia from "../components/HeroMedia.jsx";
import ScrollTour from "../components/ScrollTour.jsx";
import DeskCalculator from "../components/DeskCalculator.jsx";
import SpotlightPriceCard from "../components/SpotlightPriceCard.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import AnchorLink from "../components/AnchorLink.jsx";
import Photo from "../components/Photo.jsx";
import { PriceNote } from "../components/Notes.jsx";
import { ArrowDown, ArrowRight } from "../components/Icons.jsx";
import SplitText from "../reactbits/SplitText.jsx";
import FadeContent from "../reactbits/FadeContent.jsx";
import { useReducedMotion } from "../lib/media.js";
import { useLastQuote } from "../lib/quoteStore.js";

const H1 = "A desk in the city, inside Charles Hope.";

export default function Home() {
  const reduced = useReducedMotion();
  const last = useLastQuote();
  const live = last && last.page === "Home" ? last : null;

  return (
    <Page pageKey="home" hero>
      <div className="hero on-dark">
        <HeroMedia />
        <div className="container hero__content">
          <div className="hero__text">
            <span className="overline">Charles Hope Cowork</span>
            {reduced ? (
              <h1 className="display">{H1}</h1>
            ) : (
              <SplitText tag="h1" text={H1} className="display" textAlign="left" trigger="load" delay={22} duration={0.9} />
            )}
            <p className="lead hero__standfirst">
              Charles Hope Cowork is a hot-desk workspace on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel. Noah, the hotel's restaurant, is on site. Book a site inspection or request a quote on WhatsApp.
            </p>
            <div className="actions">
              <WhatsAppButton page="Home" label="Book a site inspection on WhatsApp" />
              <AnchorLink to="tour" className="hero__cue">
                Tour the floor <ArrowDown />
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>

      <ScrollTour
        intro={
          <p className="lead">
            The 9th floor has open-plan desks, three boardrooms, a glass meeting pod, phone booths, a lounge with city views and a kitchen. Scroll to walk through it.
          </p>
        }
      >
        <div className="actions" style={{ marginTop: 0 }}>
          <WhatsAppButton page="Home" label="Book a site inspection on WhatsApp" />
          <AnchorLink to="estimate" className="link link-arrow">
            See what a desk costs
          </AnchorLink>
          <Link to="/amenities" className="link link-arrow">
            See amenities
          </Link>
        </div>
      </ScrollTour>

      <section id="estimate" className="section section--white" aria-labelledby="estimate-heading">
        <div className="container split split--wide-right">
          <FadeContent duration={0.6}>
            <div className="section-head">
              <span className="overline">Desk estimate</span>
              <h2 className="h2" id="estimate-heading">
                How many desks do you need?
              </h2>
              <p>Choose a desk type and move the slider to see an estimated total.</p>
              <p>
                <Link to="/desks-and-pricing" className="link link-arrow">
                  See full desks and pricing <ArrowRight />
                </Link>
              </p>
            </div>
          </FadeContent>
          <DeskCalculator variant="compact" products={["hot-desk"]} />
        </div>
      </section>

      <section className="section section--light" aria-labelledby="hotel-heading">
        <div className="container split split--center">
          <FadeContent duration={0.6}>
            <div className="stack">
              <span className="overline">The hotel and Noah</span>
              <h2 className="h2" id="hotel-heading">
                Part of the Charles Hope hotel
              </h2>
              <p>Charles Hope Cowork sits inside Charles Hope, a 41-room boutique hotel, so you get more than a desk.</p>
              <p>Monthly tenants get a discount at Noah, the on-site restaurant, for client lunches, coffee and after-work drinks. Ask us on WhatsApp for the current discount.</p>
              <p>Corporate accommodation rates are available at Charles Hope for your visiting clients, colleagues, or yourself when you are in town. Ask us on WhatsApp for those rates.</p>
              <p>Hotel guests can work from Cowork at R200 a day.</p>
              <PriceNote />
              <div className="actions">
                <WhatsAppButton page="Home" template="noah" label="Ask us on WhatsApp" />
                <Link to="/hotel-guests" className="link link-arrow">
                  For hotel guests
                </Link>
              </div>
            </div>
          </FadeContent>
          <Photo id="07-reception-charleshope-wall" tall />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="rates-heading">
        <div className="container">
          <div className="section-head">
            <span className="overline">Rates</span>
            <h2 className="h2" id="rates-heading">
              Rates at a glance
            </h2>
            <PriceNote />
          </div>
          <div className="grid grid--4">
            <SpotlightPriceCard title="Basic desk" priceLabel="R3,000" period="per month" hint="Day rate R280 if you are not on a monthly plan." to="/desks-and-pricing" linkLabel="See desks" />
            <SpotlightPriceCard title="Screen desk" priceLabel="R3,750" period="per month" hint="Day rate R350 if you are not on a monthly plan. Two monitors." to="/desks-and-pricing" linkLabel="See desks" />
            <SpotlightPriceCard title="Hotel guests" priceLabel="R200" period="per day" to="/hotel-guests" linkLabel="For hotel guests" />
            <SpotlightPriceCard title="Private workspace" priceLabel="R450" period="per day" to="/desks-and-pricing" linkLabel="See rooms" />
          </div>
          <p className="caption" style={{ marginTop: 16 }}>
            Boardroom R1,500 for four hours, or R4,000 for a full day.
          </p>
        </div>
      </section>

      <section className="section section--deep section--close on-dark" aria-labelledby="close-heading">
        <div className="container">
          <div className="section-head">
            <h2 className="h2" id="close-heading">
              Visit the 9th floor
            </h2>
            <p className="lead">Message us to book a site inspection and request a quote. We will confirm what is available and how to pay.</p>
          </div>
          <div className="actions">
            <WhatsAppButton page="Home" option={live?.summary} estimate={live?.total} label="Book a site inspection on WhatsApp" />
            <Link to="/book" className="btn btn--on-dark">
              Send a booking request
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
