import { useEffect, useId, useState } from "react";
import { toInt } from "../lib/calculator.js";

/** A radio group shown as chips. Native radios, so arrow keys work. */
export function ChipGroup({ legend, name, options, value, onChange, hint }) {
  const id = useId();
  return (
    <fieldset className="fieldset">
      <legend className="legend">{legend}</legend>
      <div className="chips">
        {options.map((o) => (
          <label className="chip" key={o.value}>
            <input
              type="radio"
              name={`${name}-${id}`}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {hint && <p className="caption hint-text">{hint}</p>}
    </fieldset>
  );
}

/** A whole-number input that rounds and clamps, and never shows NaN. */
export function NumberInput({ id, value, min, max, onChange, className = "input input--number", ...rest }) {
  const [raw, setRaw] = useState(String(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setRaw(String(value));
  }, [value, focused]);
  return (
    <input
      id={id}
      className={className}
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      step={1}
      value={focused ? raw : String(value)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setRaw(String(value));
      }}
      onChange={(e) => {
        setRaw(e.target.value);
        onChange(toInt(e.target.value, min, max));
      }}
      {...rest}
    />
  );
}

export function NumberField({ label, value, min, max, onChange, hint }) {
  const id = useId();
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <NumberInput id={id} value={value} min={min} max={max} onChange={onChange} />
      {hint && <p className="caption hint-text">{hint}</p>}
    </div>
  );
}

/** The 1 to 20 desk slider with a number input beside it, both bound to the same value. */
export function DeskSlider({ label = "How many desks do you need?", value, min, max, onChange }) {
  const id = useId();
  const valueText = `${value} ${value === 1 ? "desk" : "desks"}`;
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="range-row">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={valueText}
          onChange={(e) => onChange(toInt(e.target.value, min, max))}
        />
        <NumberInput value={value} min={min} max={max} onChange={onChange} aria-label="Number of desks" />
      </div>
    </div>
  );
}
