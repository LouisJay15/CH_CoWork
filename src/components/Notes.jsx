export function PriceNote({ className = "" }) {
  return <p className={`caption price-note ${className}`}>Prices shown incl. VAT.</p>;
}

export function EstimateDisclaimer({ className = "" }) {
  return (
    <p className={`caption ${className}`}>
      This estimate is not a quote. We will confirm availability and the final amount on WhatsApp.
    </p>
  );
}
