import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_SELECTION,
  DESK_MAX,
  DESK_MIN,
  DAYS_MIN,
  SLOTS_MIN,
  PRODUCT_LABELS,
  estimate,
  formatRand,
  normalize,
  usesDays,
  usesDesks,
} from "../lib/calculator.js";
import { setLastQuote } from "../lib/quoteStore.js";
import { usePage } from "./Page.jsx";
import { ChipGroup, DeskSlider, NumberField } from "./Controls.jsx";
import { EstimateDisclaimer, PriceNote } from "./Notes.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

/** Renders nothing: reports a selection from inside <Page>. */
export function QuoteReporter({ selection, touched }) {
  useQuoteReporting(selection, touched);
  return null;
}

/** Reports a touched selection to the page (for the sticky bar and header) and to the session (for /book). */
export function useQuoteReporting(selection, touched) {
  const { page, setQuote } = usePage();
  useEffect(() => {
    if (!touched) return;
    const e = estimate(selection);
    setQuote({ option: e.summary, estimate: e.total });
    setLastQuote({ selection: e.selection, summary: e.summary, total: e.total, page: page.name });
  }, [selection, touched, page.name, setQuote]);
}

export function EstimateResult({ selection, page, heading = "Your estimate", showBookingLink = true }) {
  const e = estimate(selection);
  const navigate = useNavigate();
  const headingId = useId();
  return (
    <div className="calc__result" aria-labelledby={headingId} role="group">
      <span className="overline" id={headingId}>
        {heading}
      </span>
      <ul className="calc__lines">
        {e.lines.map((l) => (
          <li key={l.label}>
            <span>{l.label}</span>
            <span>{formatRand(l.amount)}</span>
          </li>
        ))}
      </ul>
      <p className="caption calc__total-label">Estimated total</p>
      <p className="calc__total" aria-live="polite">
        {formatRand(e.total)}
      </p>
      <div className="calc__notes">
        <PriceNote className="" />
        <EstimateDisclaimer />
      </div>
      {e.hint && <p className="note">{e.hint}</p>}
      <div className="calc__cta">
        <WhatsAppButton page={page} option={e.summary} estimate={e.total} label="Request this quote on WhatsApp" />
        {showBookingLink && (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setLastQuote({ selection: e.selection, summary: e.summary, total: e.total, page });
              navigate("/book", { state: { selection: e.selection } });
            }}
          >
            Or send a booking request online
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Desk and room calculator (plan section 6.12).
 * Uncontrolled by default. Pass value and onChange to share the selection with Find your setup.
 */
export default function DeskCalculator({
  variant = "full",
  products = ["hot-desk", "hotel-guest", "private-workspace", "boardroom"],
  initial,
  value,
  onChange,
  showTerm = true,
  id,
}) {
  const controlled = value !== undefined;
  const [local, setLocal] = useState(() => normalize({ ...DEFAULT_SELECTION, ...initial }));
  const [touched, setTouched] = useState(false);
  const selection = controlled ? value : local;
  const { page } = usePage();
  useQuoteReporting(selection, !controlled && touched);
  const formRef = useRef(null);

  const update = (patch) => {
    const next = normalize({ ...selection, ...patch });
    if (controlled) onChange(next);
    else {
      setLocal(next);
      setTouched(true);
    }
  };

  const s = selection;
  return (
    <div id={id} className={`card calc calc--${variant}`}>
      <form className="calc__controls" ref={formRef} onSubmit={(e) => e.preventDefault()} aria-label="Desk estimate">
        {products.length > 1 && (
          <ChipGroup
            legend="What do you need?"
            name="product"
            value={s.product}
            onChange={(product) => update({ product })}
            options={products.map((p) => ({ value: p, label: PRODUCT_LABELS[p] }))}
          />
        )}
        {s.product === "hot-desk" && (
          <>
            <ChipGroup
              legend="Desk type"
              name="desk-type"
              value={s.deskType}
              onChange={(deskType) => update({ deskType })}
              options={[
                { value: "basic", label: "Basic" },
                { value: "screen", label: "Screen, two monitors" },
              ]}
            />
            {showTerm && (
              <ChipGroup
                legend="Monthly or day pass?"
                name="term"
                value={s.term}
                onChange={(term) => update({ term })}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "day-pass", label: "Day pass" },
                ]}
              />
            )}
          </>
        )}
        {usesDesks(s) && <DeskSlider value={s.desks} min={DESK_MIN} max={DESK_MAX} onChange={(desks) => update({ desks })} />}
        {usesDays(s) && <NumberField label="How many days?" value={s.days} min={DAYS_MIN} onChange={(days) => update({ days })} />}
        {s.product === "hotel-guest" && <p className="caption hint-text">The hotel guest rate is R200 per day.</p>}
        {s.product === "boardroom" && (
          <>
            <ChipGroup
              legend="How long?"
              name="boardroom-length"
              value={s.boardroomLength}
              onChange={(boardroomLength) => update({ boardroomLength })}
              options={[
                { value: "four-hours", label: "Four hours" },
                { value: "full-day", label: "Full day" },
              ]}
            />
            <NumberField label="How many slots?" value={s.slots} min={SLOTS_MIN} onChange={(slots) => update({ slots })} />
          </>
        )}
      </form>
      <EstimateResult selection={s} page={page.name} />
    </div>
  );
}
