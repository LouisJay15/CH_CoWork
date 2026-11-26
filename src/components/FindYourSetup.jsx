import { useEffect, useRef, useState } from "react";
import { DESK_MAX, DESK_MIN, DAYS_MIN, normalize, usesDays } from "../lib/calculator.js";
import { scrollToId } from "../lib/anchor.js";
import { DeskSlider, NumberField } from "./Controls.jsx";
import { EstimateResult } from "./DeskCalculator.jsx";
import { usePage } from "./Page.jsx";

function Option({ pressed, onClick, title, detail }) {
  return (
    <button type="button" className="fys__option" aria-pressed={pressed} onClick={onClick}>
      <span>{title}</span>
      {detail && <small>{detail}</small>}
    </button>
  );
}

/** Three short questions and a result, kept in sync with the full calculator (plan section 9). */
export default function FindYourSetup({ value, onChange, calculatorId = "calculator" }) {
  const [step, setStep] = useState(1);
  const headingRef = useRef(null);
  const firstRender = useRef(true);
  const { page } = usePage();
  const s = value;
  const set = (patch) => onChange(normalize({ ...s, ...patch }));

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const progress = step === "result" ? 3 : step;
  return (
    <div className="fys card card--pad">
      <div className="fys__progress">
        <div className="fys__bars" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span key={n} className={n <= progress ? "is-on" : ""} />
          ))}
        </div>
        <span className="caption">{step === "result" ? "Your result" : `Step ${step} of 3`}</span>
      </div>

      {step === 1 && (
        <div className="fys__step">
          <h3 ref={headingRef} tabIndex={-1}>How long do you need a desk?</h3>
          <div className="fys__options fys__options--3">
            <Option
              title="A month or more"
              detail="Monthly desk, no minimum term"
              pressed={s.product === "hot-desk" && s.term === "monthly"}
              onClick={() => {
                set({ product: "hot-desk", term: "monthly" });
                setStep(2);
              }}
            />
            <Option
              title="A day or a short stay"
              detail="Day pass"
              pressed={s.product === "hot-desk" && s.term === "day-pass"}
              onClick={() => {
                set({ product: "hot-desk", term: "day-pass" });
                setStep(2);
              }}
            />
            <Option
              title="I am staying at the Charles Hope hotel"
              detail="Hotel guest rate"
              pressed={s.product === "hotel-guest"}
              onClick={() => {
                set({ product: "hotel-guest" });
                setStep(2);
              }}
            />
          </div>
          <div className="fys__nav">
            <button
              type="button"
              className="text-button"
              onClick={() => {
                set({ product: "private-workspace" });
                scrollToId(calculatorId);
              }}
            >
              I want a private workspace or a boardroom
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fys__step">
          <h3 ref={headingRef} tabIndex={-1}>Which desk?</h3>
          <div className="fys__options fys__options--2">
            <Option
              title="Basic desk, no monitor"
              pressed={s.deskType === "basic"}
              onClick={() => {
                set({ deskType: "basic" });
                setStep(3);
              }}
            />
            <Option
              title="Screen desk, with two monitors"
              pressed={s.deskType === "screen"}
              onClick={() => {
                set({ deskType: "screen" });
                setStep(3);
              }}
            />
          </div>
          {s.product === "hotel-guest" && (
            <p className="caption hint-text">The hotel guest rate is R200 per day. We will confirm the desk type when you book.</p>
          )}
          <div className="fys__nav">
            <button type="button" className="btn btn--secondary" onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fys__step">
          <h3 ref={headingRef} tabIndex={-1}>How many desks?</h3>
          <div style={{ marginTop: 16 }}>
            <DeskSlider label="Desks" value={s.desks} min={DESK_MIN} max={DESK_MAX} onChange={(desks) => set({ desks })} />
            {usesDays(s) && <NumberField label="How many days?" value={s.days} min={DAYS_MIN} onChange={(days) => set({ days })} />}
          </div>
          <div className="fys__nav">
            <button type="button" className="btn btn--secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button type="button" className="btn btn--primary" onClick={() => setStep("result")}>
              Show my estimate
            </button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="fys__step">
          <h3 ref={headingRef} tabIndex={-1}>Your setup</h3>
          <div style={{ marginTop: 16, borderRadius: 16, overflow: "hidden", border: "1px solid var(--rule)" }}>
            <EstimateResult selection={s} page={page.name} heading="Estimate" />
          </div>
          <div className="fys__nav">
            <button type="button" className="btn btn--secondary" onClick={() => setStep(3)}>
              Back
            </button>
            <button type="button" className="text-button" onClick={() => scrollToId(calculatorId)}>
              Adjust this in the calculator
            </button>
            <button type="button" className="text-button" onClick={() => setStep(1)}>
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
