import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DESK_MAX, DESK_MIN, DAYS_MIN, SLOTS_MIN, estimate, formatRand } from "../lib/calculator.js";
import { EnquiryError, sendEnquiry } from "../lib/api.js";
import { DEMO_FORMS } from "../lib/site.js";
import { ChipGroup, NumberInput } from "./Controls.jsx";
import { PriceNote } from "./Notes.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

export const BOOKING_PRODUCTS = [
  { value: "site-inspection", label: "A site inspection" },
  { value: "monthly-desk", label: "A monthly desk" },
  { value: "day-pass", label: "A day pass" },
  { value: "hotel-guest", label: "A desk at the hotel guest rate" },
  { value: "private-workspace", label: "A private workspace" },
  { value: "boardroom", label: "A boardroom" },
  { value: "glass-meeting-pod", label: "The glass meeting pod" },
  { value: "phone-booth", label: "A phone booth" },
];

const USES_DESK_TYPE = ["monthly-desk", "day-pass", "hotel-guest"];
const USES_DESKS = ["monthly-desk", "day-pass", "hotel-guest"];
const USES_DAYS = ["day-pass", "hotel-guest", "private-workspace"];
const USES_TIME = ["site-inspection", "boardroom", "glass-meeting-pod", "phone-booth"];

/** Calculator selection for a booking, so the form can show the same estimate the calculator does. */
export function bookingToSelection(b) {
  switch (b.product) {
    case "monthly-desk":
      return { product: "hot-desk", term: "monthly", deskType: b.deskType, desks: b.desks };
    case "day-pass":
      return { product: "hot-desk", term: "day-pass", deskType: b.deskType, desks: b.desks, days: b.days };
    case "hotel-guest":
      return { product: "hotel-guest", desks: b.desks, days: b.days };
    case "private-workspace":
      return { product: "private-workspace", days: b.days };
    case "boardroom":
      return { product: "boardroom", boardroomLength: b.boardroomLength, slots: b.slots };
    default:
      return null;
  }
}

/** Booking form values from a calculator selection (when the visitor comes from a calculator). */
export function selectionToBooking(sel) {
  if (!sel) return {};
  const base = { deskType: sel.deskType, desks: sel.desks, days: sel.days, boardroomLength: sel.boardroomLength, slots: sel.slots };
  switch (sel.product) {
    case "hot-desk":
      return { ...base, product: sel.term === "day-pass" ? "day-pass" : "monthly-desk" };
    case "hotel-guest":
      return { ...base, product: "hotel-guest" };
    case "private-workspace":
      return { ...base, product: "private-workspace" };
    case "boardroom":
      return { ...base, product: "boardroom" };
    default:
      return {};
  }
}

const todayIso = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, optional, error, children, hint }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {optional && <span className="caption"> (optional)</span>}
      </label>
      {children}
      {hint && (
        <p className="caption hint-text" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="error-text" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Booking request or question. Sends to the Python API, which stores it in Supabase and emails louis@charleshope.co.uk.
 * kinds: which kinds the visitor can choose between.
 */
export default function EnquiryForm({ page, kinds = ["booking", "question"], initialKind, prefill }) {
  const uid = useId();
  const fid = (name) => `${uid}-${name}`;
  const formRef = useRef(null);
  const [kind, setKind] = useState(initialKind ?? kinds[0]);
  const [b, setB] = useState(() => ({
    product: "site-inspection",
    deskType: "basic",
    desks: 1,
    days: 1,
    boardroomLength: "four-hours",
    slots: 1,
    date: "",
    time: "",
    ...selectionToBooking(prefill),
  }));
  const [contact, setContact] = useState({ name: "", email: "", phone: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle" });

  const setBooking = (patch) => setB((prev) => ({ ...prev, ...patch }));
  const setC = (patch) => setContact((prev) => ({ ...prev, ...patch }));
  const isBooking = kind === "booking";
  const sel = isBooking ? bookingToSelection(b) : null;
  const est = sel ? estimate(sel) : null;

  const validate = () => {
    const e = {};
    if (!contact.name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(contact.email.trim())) e.email = "Please enter an email address we can reply to, for example name@example.com.";
    if (isBooking) {
      if (!b.date) e.date = "Please choose a date.";
      else if (b.date < todayIso()) e.date = "Please choose today or a later date.";
    } else if (!contact.message.trim()) {
      e.message = "Please type your question.";
    }
    if (!contact.consent) e.consent = "Please tick this box so that we can store your details and reply.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = formRef.current.querySelector('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    const payload = {
      kind,
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim() || null,
      message: contact.message.trim() || null,
      page,
      consent: contact.consent,
      website: contact.website,
    };
    if (isBooking) {
      Object.assign(payload, {
        product: b.product,
        desk_type: USES_DESK_TYPE.includes(b.product) ? b.deskType : null,
        desks: USES_DESKS.includes(b.product) ? b.desks : null,
        days: USES_DAYS.includes(b.product) ? b.days : null,
        boardroom_length: b.product === "boardroom" ? b.boardroomLength : null,
        slots: b.product === "boardroom" ? b.slots : null,
        preferred_date: b.date,
        preferred_time: USES_TIME.includes(b.product) && b.time ? b.time : null,
      });
    }
    setStatus({ state: "sending" });
    try {
      const res = await sendEnquiry(payload);
      setStatus({ state: "sent", reference: res.reference, demo: res.demo });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof EnquiryError ? err.message : "Something went wrong. Please message us on WhatsApp." });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="alert" role="status">
        <h3>{isBooking ? "Thank you, your booking request is with us" : "Thank you, your question is with us"}</h3>
        {status.demo ? (
          <p>
            <strong>Demo build:</strong> this request was not sent. On the live site it is saved and emailed to Charles Hope Cowork.
          </p>
        ) : (
          <p>
            Your reference is <strong>{status.reference}</strong>. We will reply by email{contact.phone ? " or phone" : ""}
            {isBooking ? " to confirm availability, the rate and how to pay. This is a request, not a confirmed booking." : "."}
          </p>
        )}
        <p>For a faster answer, message us on WhatsApp.</p>
        <div className="actions" style={{ marginTop: 12 }}>
          <WhatsAppButton page={page} option={est?.summary} estimate={est?.total} label="Message us on WhatsApp" />
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setStatus({ state: "idle" });
              setC({ message: "" });
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const invalid = (name) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${fid(name)}-error` } : {});

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card card--pad">
      {kinds.length > 1 && (
        <ChipGroup
          legend="What would you like to send?"
          name="kind"
          value={kind}
          onChange={(k) => {
            setKind(k);
            setErrors({});
          }}
          options={[
            { value: "booking", label: "A booking request" },
            { value: "question", label: "A question" },
          ]}
        />
      )}

      {isBooking && (
        <div style={{ marginTop: kinds.length > 1 ? 24 : 0 }}>
          <Field id={fid("product")} label="What would you like to book?">
            <select id={fid("product")} className="select" value={b.product} onChange={(e) => setBooking({ product: e.target.value })}>
              {BOOKING_PRODUCTS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>

          {USES_DESK_TYPE.includes(b.product) && (
            <div style={{ marginTop: 20 }}>
              <ChipGroup
                legend="Desk type"
                name="booking-desk-type"
                value={b.deskType}
                onChange={(deskType) => setBooking({ deskType })}
                options={[
                  { value: "basic", label: "Basic" },
                  { value: "screen", label: "Screen, two monitors" },
                ]}
                hint={b.product === "hotel-guest" ? "The hotel guest rate is R200 per day. We will confirm the desk type when you book." : undefined}
              />
            </div>
          )}

          <div className="form-grid form-grid--2" style={{ marginTop: 20 }}>
            {USES_DESKS.includes(b.product) && (
              <Field id={fid("desks")} label="Number of desks">
                <NumberInput id={fid("desks")} className="input" value={b.desks} min={DESK_MIN} max={DESK_MAX} onChange={(desks) => setBooking({ desks })} />
              </Field>
            )}
            {USES_DAYS.includes(b.product) && (
              <Field id={fid("days")} label="Number of days">
                <NumberInput id={fid("days")} className="input" value={b.days} min={DAYS_MIN} onChange={(days) => setBooking({ days })} />
              </Field>
            )}
            {b.product === "boardroom" && (
              <>
                <Field id={fid("length")} label="How long?">
                  <select id={fid("length")} className="select" value={b.boardroomLength} onChange={(e) => setBooking({ boardroomLength: e.target.value })}>
                    <option value="four-hours">Four hours</option>
                    <option value="full-day">Full day</option>
                  </select>
                </Field>
                <Field id={fid("slots")} label="How many slots?">
                  <NumberInput id={fid("slots")} className="input" value={b.slots} min={SLOTS_MIN} onChange={(slots) => setBooking({ slots })} />
                </Field>
              </>
            )}
            <Field id={fid("date")} label={b.product === "monthly-desk" ? "Start date" : "Preferred date"} error={errors.date}>
              <input id={fid("date")} type="date" className="input" min={todayIso()} value={b.date} onChange={(e) => setBooking({ date: e.target.value })} {...invalid("date")} />
            </Field>
            {USES_TIME.includes(b.product) && !(b.product === "boardroom" && b.boardroomLength === "full-day") && (
              <Field id={fid("time")} label="Preferred start time" optional>
                <input id={fid("time")} type="time" className="input" step={900} value={b.time} onChange={(e) => setBooking({ time: e.target.value })} />
              </Field>
            )}
          </div>

          {est && (
            <div className="note" style={{ marginTop: 20 }}>
              <p>
                <strong>{est.summary}</strong>: estimated {formatRand(est.total)}
              </p>
              <PriceNote className="" />
              <p className="caption">This estimate is not a quote. We will confirm availability and the final amount.</p>
            </div>
          )}
          {(b.product === "glass-meeting-pod" || b.product === "phone-booth") && (
            <p className="note" style={{ marginTop: 20 }}>
              The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate.
            </p>
          )}
        </div>
      )}

      <div className="form-grid form-grid--2" style={{ marginTop: 24 }}>
        <Field id={fid("name")} label="Your name" error={errors.name}>
          <input id={fid("name")} className="input" autoComplete="name" value={contact.name} onChange={(e) => setC({ name: e.target.value })} {...invalid("name")} />
        </Field>
        <Field id={fid("email")} label="Email" error={errors.email}>
          <input id={fid("email")} type="email" className="input" autoComplete="email" value={contact.email} onChange={(e) => setC({ email: e.target.value })} {...invalid("email")} />
        </Field>
        <Field id={fid("phone")} label="Phone" optional>
          <input id={fid("phone")} type="tel" className="input" autoComplete="tel" value={contact.phone} onChange={(e) => setC({ phone: e.target.value })} />
        </Field>
      </div>
      <div style={{ marginTop: 20 }}>
        <Field id={fid("message")} label={isBooking ? "Anything we should know?" : "Your question"} optional={isBooking} error={errors.message}>
          <textarea id={fid("message")} className="textarea" value={contact.message} maxLength={2000} onChange={(e) => setC({ message: e.target.value })} {...invalid("message")} />
        </Field>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={fid("website")}>Leave this empty</label>
        <input id={fid("website")} tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setC({ website: e.target.value })} />
      </div>

      <div className="field" style={{ marginTop: 24 }}>
        <div className="checkbox">
          <input id={fid("consent")} type="checkbox" checked={contact.consent} onChange={(e) => setC({ consent: e.target.checked })} {...invalid("consent")} />
          <label htmlFor={fid("consent")}>
            I agree that Charles Hope Cowork may store my details and contact me about this request, as set out in the{" "}
            <Link className="link" to="/privacy">
              privacy notice
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p className="error-text" id={`${fid("consent")}-error`}>
            {errors.consent}
          </p>
        )}
      </div>

      {status.state === "error" && (
        <div className="alert alert--error" role="alert" style={{ marginTop: 20 }}>
          <p>{status.message}</p>
        </div>
      )}

      <div className="actions">
        <button type="submit" className="btn btn--primary" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending..." : isBooking ? "Send booking request" : "Send question"}
        </button>
        {DEMO_FORMS && <span className="caption">Demo build: forms are not sent.</span>}
      </div>
    </form>
  );
}
