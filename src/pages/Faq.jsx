import { useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import FaqList from "../components/FaqList.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { PriceNote } from "../components/Notes.jsx";

export const FAQ = [
  ["Where are you?", "Charles Hope Cowork is on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel."],
  ["What is the difference between Basic and Screen?", "A Screen desk is a Basic desk with two monitors."],
  ["Do the prices include VAT?", "Yes. All prices on this site are shown incl. VAT. Please ask if you need a tax invoice."],
  ["I am staying at the hotel. Can I use a desk?", "Yes. Hotel guests can use the workspace at R200 a day, with full access to cowork amenities except the Noah discount."],
  ["Can I come for just one day?", "Yes. Day rates are R280 for a Basic desk and R350 for a Screen desk if you are not on a monthly plan."],
  [
    "Can I book a boardroom or a pod?",
    "Yes. There are three boardrooms. Tenants and day guests can book a time slot for a boardroom, the glass meeting pod or a phone booth. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, with no separate charge. A private workspace is R450 per day. A boardroom is R1,500 for four hours, or R4,000 for a full day. Message us on WhatsApp to check a time.",
  ],
  ["Is coffee included?", "Yes. Coffee is included in the desk rates. Printing is available on request."],
  [
    "Is there a discount at Noah, or a corporate hotel rate?",
    "Monthly tenants get a discount at Noah, and corporate accommodation rates are available at the Charles Hope hotel. Ask us on WhatsApp. The hotel guest cowork rate does not include the Noah discount.",
  ],
  ["Is there parking?", "Please ask when you book if you need parking advice."],
  [
    "Who is this for?",
    "The space is aimed at professionals who need a quiet, presentable desk in the city centre, including visiting attorneys, advocates and consultants. Others are welcome to enquire.",
  ],
  [
    "How do I book?",
    "Message us on WhatsApp at +27 68 947 8807 to book a site inspection and request a quote, or send a booking request on the Book page. You can also call 021 600 6826 or email louis@charleshope.co.uk. We will confirm availability and how to pay.",
  ],
];

function useFaqSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
}

export default function Faq() {
  useFaqSchema();
  return (
    <Page pageKey="faq">
      <PageHeader eyebrow="FAQ" title="Questions">
        <PriceNote />
      </PageHeader>
      <section className="section section--white" aria-label="Frequently asked questions">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <FaqList
            items={FAQ.map(([question, answer]) => ({
              question,
              answer: question === "How do I book?" ? (
                <p>
                  Message us on WhatsApp at +27 68 947 8807 to book a site inspection and request a quote, or send a booking request on the <Link className="link" to="/book">Book page</Link>. You can also call 021 600 6826 or email louis@charleshope.co.uk. We will confirm availability and how to pay.
                </p>
              ) : (
                <p>{answer}</p>
              ),
            }))}
          />
          <div className="actions">
            <WhatsAppButton page="FAQ" label="Book a site inspection on WhatsApp" />
          </div>
        </div>
      </section>
      <section className="section section--light" aria-labelledby="ask-heading">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <div className="section-head">
            <h2 className="h2" id="ask-heading">Still have a question?</h2>
            <p>Send it here and we will reply by email.</p>
          </div>
          <EnquiryForm page="FAQ" kinds={["question"]} />
        </div>
      </section>
    </Page>
  );
}
