import { Link } from "react-router-dom";
import SpotlightCard from "../reactbits/SpotlightCard.jsx";
import { BRAND } from "../brand/brand.js";

/** A rate card on the React Bits Spotlight Card. The price is always fully visible: the spotlight is only a glow. */
export default function SpotlightPriceCard({ title, priceLabel, period, hint, to, linkLabel }) {
  return (
    <SpotlightCard className="rate-card" theme="light" spotlightColor={BRAND.spotlightColor} intensity={0.5} borderGlow={0.8}>
      <h3>{title}</h3>
      <p className="rate-card__price">{priceLabel}</p>
      <p className="rate-card__period">{period}</p>
      {hint && <p className="caption rate-card__hint">{hint}</p>}
      <div className="rate-card__cta">
        <Link className="btn btn--primary" to={to}>
          {linkLabel}
        </Link>
      </div>
    </SpotlightCard>
  );
}
