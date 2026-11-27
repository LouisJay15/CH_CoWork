import { Link } from "react-router-dom";
import { FOOTER_NAV, NAV_LABELS, PAGES } from "../lib/pages.js";
import { EMAIL, LEGAL_NAME, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER_DISPLAY } from "../lib/site.js";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import { usePage } from "./Page.jsx";

export default function Footer() {
  const { page } = usePage();
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer-grid">
          <div className="stack" style={{ "--stack": "12px" }}>
            <h2>Charles Hope Coworking Space</h2>
            <p>81 Loop Street, 9th floor, Cape Town</p>
            <p>Inside the Charles Hope hotel, a 41-room boutique hotel. Noah is the on-site restaurant.</p>
          </div>
          <address className="footer-contact">
            <span className="overline">Contact</span>
            <ul className="contact-list">
              <li>
                <strong className="visually-hidden">WhatsApp</strong>
                <a
                  href={buildWhatsAppUrl({ page: page.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${WHATSAPP_NUMBER_DISPLAY}, opens WhatsApp in a new tab`}
                >
                  WhatsApp {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <a href={PHONE_TEL}>Telephone {PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </address>
          <nav aria-label="Footer">
            <span className="overline">Pages</span>
            <ul>
              {FOOTER_NAV.map((key) => (
                <li key={key}>
                  <Link to={PAGES[key].path}>{NAV_LABELS[key] ?? PAGES[key].name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {LEGAL_NAME}</p>
          <ul style={{ display: "flex", gap: "20px" }}>
            <li>
              <Link to={PAGES.terms.path}>Terms and house rules</Link>
            </li>
            <li>
              <Link to={PAGES.privacy.path}>Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
