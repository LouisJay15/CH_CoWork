import { StarBorder } from "../reactbits/lazy.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { ChatIcon } from "./Icons.jsx";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import { useFinePointer } from "../lib/media.js";

/**
 * The main WhatsApp button with a coral light running round its edge (React Bits StarBorder).
 * The label keeps full contrast (navy on white over dark backgrounds, white on navy over light ones);
 * the coral is only the light. Until the effect loads, the ordinary button shows in the same place and size.
 * Computers only: on phones and tablets the light would redraw a canvas 60 times a second for no benefit (there is no
 * hover), which can overload Safari, so they get the ordinary button.
 */
export default function GlowWhatsAppButton({ page, option, estimate, template, label = "Book a site inspection on WhatsApp", onDark = true }) {
  const fine = useFinePointer();
  if (!fine) return <WhatsAppButton page={page} option={option} estimate={estimate} template={template} label={label} />;
  const href = buildWhatsAppUrl({ page, option, estimate, template });
  return (
    <StarBorder
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, opens WhatsApp in a new tab`}
      className="star-cta"
      theme="dark"
      color="#F8706B"
      backgroundColor={onDark ? "#FFFFFF" : "#194049"}
      textColor={onDark ? "#194049" : "#FFFFFF"}
      borderColor="rgba(248, 112, 107, 0.45)"
      radius={6}
      thickness={1.5}
      duration={5}
      trailLength={0.35}
      glow={0.8}
      fallback={<WhatsAppButton page={page} option={option} estimate={estimate} template={template} label={label} />}
    >
      <ChatIcon />
      <span>{label}</span>
    </StarBorder>
  );
}
