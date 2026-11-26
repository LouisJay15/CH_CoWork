import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import Photo from "../components/Photo.jsx";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER_DISPLAY } from "../lib/site.js";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";

export default function Location() {
  return (
    <Page pageKey="location">
      <PageHeader eyebrow="Find us" title="Location" />

      <section className="section section--white" aria-label="Address and map">
        <div className="container split split--wide-right">
          <div className="stack" style={{ "--stack": "20px" }}>
            <address className="address lead">
              Charles Hope Cowork
              <br />
              81 Loop Street, 9th floor
              <br />
              Cape Town
            </address>
            <ul className="contact-list">
              <li>
                <strong>WhatsApp</strong>
                <a className="link" href={buildWhatsAppUrl({ page: "Location" })} target="_blank" rel="noopener noreferrer" aria-label={`${WHATSAPP_NUMBER_DISPLAY}, opens WhatsApp in a new tab`}>
                  {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <strong>Telephone</strong>
                <a className="link" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
            <p>The workspace is inside the Charles Hope hotel, a 41-room boutique hotel. Come to 81 Loop Street and take the lift to the 9th floor.</p>
            <p>Please ask when you book if you need parking advice.</p>
            <div className="actions">
              <WhatsAppButton page="Location" label="Book a site inspection on WhatsApp" />
            </div>
          </div>
          <MapEmbed />
        </div>
      </section>

      <section className="section section--light" aria-label="Photographs">
        <div className="container grid grid--2">
          <Photo id="entrance-wide" caption="Entrance" sizes="(min-width: 640px) 50vw, 100vw" />
          <Photo id="view-2" caption="The view from the 9th floor" sizes="(min-width: 640px) 50vw, 100vw" />
        </div>
      </section>
    </Page>
  );
}
