import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SCENES, TOUR_FRAMES, keyFrame } from "../lib/tour.js";
import { aspect, frame, src, srcSet } from "../lib/frames.js";
import { cover, frameState, move, scrollToFrame } from "../lib/kenburns.js";
import { useMediaQuery, useReducedMotion } from "../lib/media.js";
import AnchorLink from "./AnchorLink.jsx";
import Photo from "./Photo.jsx";

const PORTRAIT = "(orientation: portrait)";
const DESKTOP = "(min-width: 768px)";
// Scroll distance per frame, as a share of the screen height. Must match --span in site.css (.kb).
const SPAN = { mobile: 0.45, desktop: 0.6 };
const LEAD = 0.25; // frames start moving a quarter screen before the stage pins
const N = TOUR_FRAMES.length;
const SIZES = "(orientation: portrait) 134vh, 100vw"; // a 4:3 photo covering a tall screen is ~1.33x the screen height wide

/** One still in the stage. Has a tall crop for portrait screens where the frame needs one. */
function Still({ id, index, active, imgRef }) {
  const f = frame(id);
  return (
    <picture>
      {f.tall && <source media={PORTRAIT} type="image/avif" srcSet={srcSet(id, "tall", "avif")} sizes="100vw" />}
      {f.tall && <source media={PORTRAIT} type="image/webp" srcSet={srcSet(id, "tall", "webp")} sizes="100vw" />}
      <source type="image/avif" srcSet={srcSet(id, "wide", "avif")} sizes={SIZES} />
      <img
        ref={imgRef}
        className="kb__img"
        src={src(id, "wide", 1200, "webp")}
        srcSet={srcSet(id, "wide", "webp")}
        sizes={SIZES}
        alt={active ? f.alt : ""}
        aria-hidden={active ? undefined : true}
        decoding="async"
        loading={index === 0 ? "eager" : "lazy"}
        fetchpriority={index === 0 ? "high" : undefined}
        draggable={false}
      />
    </picture>
  );
}

/**
 * Home scroll tour: stills from the floor that zoom and pan toward their subject and blend
 * into the next one as you scroll, in seven scenes. Mobile first: tall crops on phones,
 * images load just before they are needed, and transforms only (no layout work) while scrolling.
 * With reduced motion it is a plain list of one photograph per scene.
 */
export default function ScrollTour({ skipTo = "estimate", intro, heading = "Tour the floor", headingId = "tour-heading", children }) {
  const reduced = useReducedMotion();
  const portrait = useMediaQuery(PORTRAIT);
  const desktop = useMediaQuery(DESKTOP);
  const [mounted, setMounted] = useState(1); // frames rendered so far (lazy, never unmounted)
  const [scene, setScene] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const sectionRef = useRef(null);
  const scenesRef = useRef(null);
  const stageRef = useRef(null);
  const imgRefs = useRef([]);
  const state = useRef({ mounted: 1, scene: 0, frame: 0 });

  useLayoutEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    let running = false;

    const draw = () => {
      raf = 0;
      const stage = stageRef.current;
      const scenes = scenesRef.current;
      if (!stage || !scenes) return;
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const span = sh * (desktop ? SPAN.desktop : SPAN.mobile);
      const g = scrollToFrame(scenes.getBoundingClientRect().top, sh, span, N, LEAD);

      // The topmost fully opaque frame hides everything under it, so only 1 or 2 layers are painted.
      let top = 0;
      for (let i = 0; i < N; i++) if (frameState(g, i).opacity >= 1) top = i;

      for (let i = 0; i < N; i++) {
        const img = imgRefs.current[i];
        if (!img) continue;
        const { opacity, t } = frameState(g, i);
        const visible = i >= top && opacity > 0;
        img.style.visibility = visible ? "visible" : "hidden";
        if (!visible) continue;
        const f = frame(TOUR_FRAMES[i].id);
        const variant = portrait && f.tall ? "tall" : "wide";
        const m = move(f.from, f.to, t);
        // On phones a landscape photo is already cropped hard to fill the screen: zoom less, let the pan move.
        if (portrait && variant === "wide") m[2] = 1 + (m[2] - 1) * 0.5;
        const c = cover(sw, sh, aspect(TOUR_FRAMES[i].id, variant), m);
        img.style.width = `${c.w}px`;
        img.style.height = `${c.h}px`;
        img.style.opacity = String(opacity);
        img.style.transform = `translate3d(${c.tx.toFixed(1)}px, ${c.ty.toFixed(1)}px, 0) scale(${c.zoom.toFixed(4)})`;
      }

      const current = Math.round(g);
      const s = TOUR_FRAMES[current].scene;
      if (s !== state.current.scene) {
        state.current.scene = s;
        setScene(s);
      }
      if (current !== state.current.frame) {
        state.current.frame = current;
        setActiveFrame(current);
      }
      // Mount the next frames ahead of time so they have loaded before they fade in,
      // but only once the tour is close, so the first page load is just the hero image.
      const near = sectionRef.current.getBoundingClientRect().top < sh * 0.6;
      const want = near ? Math.min(N, Math.ceil(g) + 3) : 1;
      if (want > state.current.mounted) {
        state.current.mounted = want;
        setMounted(want);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onScroll = () => running && schedule();
    const io = new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
      if (running) schedule();
    });
    io.observe(sectionRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [reduced, portrait, desktop, mounted]);

  // Newly mounted images: draw once they have their size.
  useEffect(() => {
    if (!reduced) window.dispatchEvent(new Event("resize"));
  }, [mounted, reduced]);

  const head = (
    <div className="container tour__head">
      <div className="tour__head-row">
        <div className="section-head">
          <span className="overline">Charles Hope Cowork, 9th floor</span>
          <h2 className="h2" id={headingId}>
            {heading}
          </h2>
          {intro}
        </div>
        <AnchorLink to={skipTo} className="link link-arrow">
          Skip the tour
        </AnchorLink>
      </div>
    </div>
  );

  if (reduced) {
    return (
      <section id="tour" className="tour on-dark" aria-labelledby={headingId}>
        {head}
        <div className="container">
          <ol className="tour-list">
            {SCENES.map((s, i) => (
              <li key={s.id}>
                <Photo id={keyFrame(s)} sizes="(min-width: 768px) 50vw, 100vw" />
                <h3>{s.heading}</h3>
                <p>{s.line}</p>
                <span className="visually-hidden">
                  Stop {i + 1} of {SCENES.length}
                </span>
              </li>
            ))}
          </ol>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id="tour" className="tour on-dark" aria-labelledby={headingId} ref={sectionRef}>
      {head}
      <div className="kb">
        <div className="kb__stage" ref={stageRef}>
          {TOUR_FRAMES.slice(0, mounted).map((f, i) => (
            <Still key={f.id} id={f.id} index={i} active={i === activeFrame} imgRef={(el) => (imgRefs.current[i] = el)} />
          ))}
          <div className="kb__shade" aria-hidden="true" />
          <div className="tour__progress" aria-hidden="true">
            {SCENES.map((s, i) => (
              <span key={s.id} className={i <= scene ? "is-on" : ""} />
            ))}
          </div>
          <AnchorLink to={skipTo} className="tour__frame-skip" tabIndex={-1} aria-hidden="true">
            Skip the tour
          </AnchorLink>
          <div className="kb__caption" aria-hidden="true">
            <div className="container">
              <div className="tour__card" key={SCENES[scene].id}>
                <span className="overline">
                  Stop {scene + 1} of {SCENES.length}
                </span>
                <h3>{SCENES[scene].heading}</h3>
                <p>{SCENES[scene].line}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="kb__track" ref={scenesRef} style={{ "--frames": N }} />
      </div>
      <ol className="visually-hidden">
        {SCENES.map((s, i) => (
          <li key={s.id}>
            Stop {i + 1} of {SCENES.length}: {s.heading}. {s.line}
          </li>
        ))}
      </ol>
      <div className="container tour__end">{children}</div>
    </section>
  );
}
