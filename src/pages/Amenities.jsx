import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import Photo, { PhotoPlaceholder } from "../components/Photo.jsx";
import { PriceNote } from "../components/Notes.jsx";
import { FadeContent } from "../reactbits/lazy.jsx";

const ROOMS = [
  { photo: "space-boardroom", title: "Boardrooms", room: "boardroom", text: "Three boardrooms. R1,500 for four hours, or R4,000 for a full day." },
  { photo: null, title: "Glass meeting pod", room: "pod", text: "Included in the desk rates, with no separate charge." },
  { photo: "space-callpods", title: "Phone booths (call pods)", room: "booth", text: "Included in the desk rates, with no separate charge." },
];

export default function Amenities() {
  return (
    <Page pageKey="amenities">
      <PageHeader eyebrow="On the floor" title="Amenities">
        <p className="lead">Charles Hope Coworking Space sits on the 9th floor at 81 Loop Street, inside the Charles Hope hotel.</p>
      </PageHeader>

      <section className="section section--white" aria-labelledby="a-work">
        <div className="container">
          <FadeContent duration={0.6}>
            <div className="section-head">
              <h2 className="h2" id="a-work">In the workspace</h2>
              <p>
                Desks and chairs, power, Wi-Fi, coffee, and a quiet working floor, including the open-plan desks and the lounge with city views. Printing is available on request.
              </p>
            </div>
          </FadeContent>
          <div className="grid grid--2">
            <Photo id="space-open" caption="Open-plan desks" sizes="(min-width: 640px) 50vw, 100vw" />
            <Photo id="kitchen-2" caption="Kitchen" sizes="(min-width: 640px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="a-rooms">
        <div className="container">
          <FadeContent duration={0.6}>
            <div className="section-head">
              <h2 className="h2" id="a-rooms">Rooms you can book</h2>
              <p>
                The three boardrooms, the glass meeting pod and the phone booths can be booked by time slot by tenants and day guests. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, with no separate charge. A private workspace is R450 per day. A boardroom is R1,500 for four hours, or R4,000 for a full day. Ask on WhatsApp for a time.
              </p>
              <PriceNote />
            </div>
          </FadeContent>
          <ul className="grid grid--3" style={{ listStyle: "none", padding: 0 }}>
            {ROOMS.map((r) => (
              <li key={r.title} className="card room-card">
                {r.photo ? <Photo id={r.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /> : <PhotoPlaceholder label={r.title} />}
                <div className="room-card__body">
                  <h3 className="h3">{r.title}</h3>
                  <p>{r.text}</p>
                  <WhatsAppButton page="Amenities" template="room" room={r.room} label="Check a time on WhatsApp" accessibleLabel={`Check a time for ${r.title.toLowerCase()} on WhatsApp`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="a-noah">
        <div className="container split">
          <FadeContent duration={0.6}>
            <div className="stack">
              <h2 className="h2" id="a-noah">Noah</h2>
              <p>
                Noah is the hotel's restaurant, on site. Coworking members are welcome at Noah during the restaurant's own opening hours. Monthly tenants get a discount at Noah; ask us on WhatsApp for the current discount. The hotel guest cowork rate does not include the Noah discount.
              </p>
              <div className="actions">
                <WhatsAppButton page="Amenities" template="noah" label="Ask us on WhatsApp" />
              </div>
            </div>
          </FadeContent>
          <FadeContent duration={0.6}>
            <div className="stack">
              <h2 className="h2" id="a-hotel">The hotel</h2>
              <p>
                You are working inside a 41-room boutique hotel. Please use hotel areas with the same care as other guests, and follow hotel rules on access, noise and visitors. Corporate accommodation rates are available; ask us on WhatsApp.
              </p>
              <Photo id="lws-close" caption="Arrival" />
            </div>
          </FadeContent>
        </div>
      </section>
    </Page>
  );
}
