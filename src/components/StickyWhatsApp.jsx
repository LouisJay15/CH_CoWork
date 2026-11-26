import WhatsAppButton from "./WhatsAppButton.jsx";
import { usePage } from "./Page.jsx";

/** Bottom bar on small screens. Carries the page name, and the live calculator selection if there is one. */
export default function StickyWhatsApp({ template }) {
  const { page, quote } = usePage();
  return (
    <div className="sticky-wa">
      <WhatsAppButton page={page.name} option={quote?.option} estimate={quote?.estimate} template={template} label="WhatsApp us" />
    </div>
  );
}
