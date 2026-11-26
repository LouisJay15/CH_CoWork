import { Link } from "react-router-dom";
import { BRAND } from "./brand.js";
import { asset } from "../lib/site.js";

/**
 * The site logo, linking home. PLACEHOLDER: a text wordmark until the approved logo is set in brand.js.
 * onDark: true when it sits on a dark background (the Home hero), for a light version of the logo.
 */
export default function Logo({ onDark = false, onClick }) {
  const logo = BRAND.logo;
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label={`${BRAND.name}, home`}>
      {logo ? (
        <img src={asset(onDark && logo.srcOnDark ? logo.srcOnDark : logo.src)} alt="" width={logo.width} height={logo.height} />
      ) : (
        <>
          <span>Charles Hope</span>
          <span className="logo__cowork">Cowork</span>
        </>
      )}
    </Link>
  );
}
