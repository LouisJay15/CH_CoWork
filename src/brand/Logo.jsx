import { Link } from "react-router-dom";
import { BRAND } from "./brand.js";
import { asset } from "../lib/site.js";

/**
 * The site logo, linking home: the CharlesHope wordmark with COWORKING SPACE beneath, as in the
 * brand guidelines. The lockup is kept intact (no effects, no recolouring beyond navy, white and coral).
 * onDark: true when it sits on a dark background (the Home hero, the footer).
 */
export default function Logo({ onDark = false, onClick }) {
  const logo = BRAND.logo;
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label={`${BRAND.name}, home`}>
      <img src={asset(onDark && logo.srcOnDark ? logo.srcOnDark : logo.src)} alt="" width={logo.width} height={logo.height} />
      <span className="logo__descriptor" aria-hidden="true">
        {logo.descriptor}
      </span>
    </Link>
  );
}
