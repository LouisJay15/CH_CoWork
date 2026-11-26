import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import { ChatIcon } from "./Icons.jsx";

/**
 * The WhatsApp call to action. Primary buttons are always #111111 text on #FF6661.
 * variant: "primary" | "secondary" | "on-dark"
 */
export default function WhatsAppButton({
  page,
  option,
  estimate,
  template,
  room,
  label = "Book a site inspection on WhatsApp",
  accessibleLabel,
  variant = "primary",
  fullWidth = false,
  className = "",
  icon = true,
}) {
  const href = buildWhatsAppUrl({ page, option, estimate, template, room });
  const classes = ["btn", `btn--${variant}`, fullWidth ? "btn--full" : "", className].filter(Boolean).join(" ");
  return (
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${accessibleLabel || label}, opens WhatsApp in a new tab`}
    >
      {icon && <ChatIcon />}
      <span>{label}</span>
    </a>
  );
}
