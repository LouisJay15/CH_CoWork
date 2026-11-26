import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Privacy() {
  return (
    <Page pageKey="privacy">
      <PageHeader title="Privacy" />
      <section className="section section--white">
        <div className="container prose" style={{ maxWidth: "48rem" }}>
          <p>Charles Hope Cowork is operated by CHARLES HOPE SA (PTY) LTD, the responsible party for this notice.</p>
          <p>
            Address: Charles Hope Cowork, 81 Loop Street, 9th floor, Cape Town
            <br />
            Contact: WhatsApp +27 68 947 8807, telephone 021 600 6826, and louis@charleshope.co.uk
          </p>
          <p>
            What is collected: if you send a booking request or a question through this site, we receive your name, your email address, any phone number you give, and the details of your request. These are stored in our database, hosted by Supabase, and sent by email to louis@charleshope.co.uk so that we can reply. If you message us on WhatsApp, the conversation takes place on WhatsApp, under WhatsApp's own terms. If you call us, we receive your phone number. If you email us, we receive the contents of that email. Analytics are off.
          </p>
          <p>
            Third parties: the Location page shows a Google Maps map. When it loads, Google receives your device's IP address and may set its own cookies, under Google's privacy policy. Supabase, Google and our email provider may store or process data outside South Africa.
          </p>
          <p>Why: to answer your enquiry, arrange a visit or booking.</p>
          <p>Sharing: not sold. Shared only where needed to provide the service (for example the hotel desk for a hotel-guest booking).</p>
          <p>Retention: we keep enquiry details only as long as needed to answer your request, arrange a visit or booking, and meet any legal duties.</p>
          <p>
            Your rights under the Protection of Personal Information Act (POPIA): access, correction, deletion and objection, via the contact details above. You may also lodge a complaint with the Information Regulator.
          </p>
          <p>If analytics or other cookies are later enabled, this page will say so and will link to cookie choices. Apart from the Google Maps map on the Location page, they are off.</p>
        </div>
      </section>
    </Page>
  );
}
