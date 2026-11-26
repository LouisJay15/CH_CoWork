import { useEffect, useRef, useState } from "react";
import { TOUR_STOPS, scrollToTime, tourTimesValid } from "../lib/tour.js";
import { PHOTOS, photoFiles, TOUR_VIDEO } from "../lib/photos.js";
import { useIsDesktop, useReducedMotion, useSaveData } from "../lib/media.js";
import AnchorLink from "./AnchorLink.jsx";
import Photo, { PhotoPlaceholder } from "./Photo.jsx";

function StopImage({ stop, active }) {
  const files = photoFiles(stop.photo);
  const cls = `tour__img ${active ? "is-active" : ""}`;
  if (!files) {
    return (
      <div className={cls} aria-hidden={!active}>
        <PhotoPlaceholder id={stop.photo} className="ph--fill" label={stop.heading} decorative={!active} />
      </div>
    );
  }
  return (
    <picture>
      {files.webp && <source type="image/webp" srcSet={files.webp} />}
      <img className={cls} src={files.src} alt={active ? PHOTOS[stop.photo].alt : ""} width={files.width} height={files.height} loading="lazy" decoding="async" />
    </picture>
  );
}

/**
 * Home scroll tour (plan section 6.19).
 * scrub: the clip follows scroll (desktop, motion allowed, clip present, stop times set).
 * photos: the pinned frame swaps photographs as each caption crosses the middle of the screen.
 * static: reduced motion; a plain list.
 */
export default function ScrollTour({ skipTo = "estimate", intro, heading = "Tour the floor", headingId = "tour-heading", children }) {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const saveData = useSaveData();
  const wantsScrub = !reduced && desktop && !saveData && Boolean(TOUR_VIDEO) && tourTimesValid();
  const [videoReady, setVideoReady] = useState(false);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0);
  const videoRef = useRef(null);
  const stopRefs = useRef([]);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const mode = reduced ? "static" : wantsScrub && videoReady ? "scrub" : "photos";

  // The active stop is the last caption card whose top has passed 60% of the screen height.
  // Checked on scroll (not only on crossings), so jumps and fast scrolls land on the right photo.
  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let idx = 0;
      cardRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) idx = i;
      });
      setActive(idx);
      setReached((r) => Math.max(r, idx + 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Fetch the clip only after the page has loaded, and only when scrubbing is wanted.
  useEffect(() => {
    if (!wantsScrub) return undefined;
    let url = null;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(TOUR_VIDEO);
        if (!res.ok) return;
        const blob = await res.blob();
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        const v = videoRef.current;
        if (!v) return;
        v.addEventListener("loadeddata", () => !cancelled && setVideoReady(true), { once: true });
        v.src = url;
      } catch {
        /* stay in photos mode */
      }
    };
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", load);
      if (url) URL.revokeObjectURL(url);
    };
  }, [wantsScrub]);

  // Scrub: map scroll to clip time, eased, only while the tour is on screen.
  useEffect(() => {
    if (mode !== "scrub") return undefined;
    const v = videoRef.current;
    const times = TOUR_STOPS.map((s) => s.time);
    let raf = 0;
    let shown = 0;
    let running = false;
    const frame = () => {
      raf = 0;
      if (!running) return;
      const centres = stopRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      const span = window.innerHeight * 0.9;
      const target = scrollToTime(centres, window.innerHeight / 2, times, v.duration || times[times.length - 1], span);
      shown += (target - shown) * 0.2;
      if (Math.abs(v.currentTime - shown) > 1 / 30 && !v.seeking) v.currentTime = shown;
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
      if (running && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(sectionRef.current);
    return () => {
      running = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

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

  if (mode === "static") {
    return (
      <section id="tour" className="tour on-dark" aria-labelledby={headingId} ref={sectionRef}>
        {head}
        <div className="container">
          <ol className="tour-list">
            {TOUR_STOPS.map((stop, i) => (
              <li key={stop.id}>
                <Photo id={stop.photo} />
                <h3>{stop.heading}</h3>
                <p>{stop.line}</p>
                <span className="visually-hidden">Stop {i + 1} of {TOUR_STOPS.length}</span>
              </li>
            ))}
          </ol>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id="tour" className={`tour tour--${mode} on-dark`} aria-labelledby={headingId} ref={sectionRef}>
      {head}
      <div className="tour__body">
        <div className="tour__frame">
          {wantsScrub && (
            <video ref={videoRef} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} style={{ opacity: mode === "scrub" ? 1 : 0 }} />
          )}
          {mode === "photos" &&
            TOUR_STOPS.map((stop, i) => (i <= reached ? <StopImage key={stop.id} stop={stop} active={i === active} /> : null))}
          <div className="tour__shade" aria-hidden="true" />
          <div className="tour__progress" aria-hidden="true">
            {TOUR_STOPS.map((s, i) => (
              <span key={s.id} className={i <= active ? "is-on" : ""} />
            ))}
          </div>
          <AnchorLink to={skipTo} className="tour__frame-skip" tabIndex={-1} aria-hidden="true">
            Skip the tour
          </AnchorLink>
        </div>
        <ol className="tour__stops" style={{ listStyle: "none", padding: 0 }}>
          {TOUR_STOPS.map((stop, i) => (
            <li key={stop.id} className="tour__stop" ref={(el) => (stopRefs.current[i] = el)}>
              <div className="container">
                <div className="tour__card" ref={(el) => (cardRefs.current[i] = el)}>
                  <span className="overline">
                    Stop {i + 1} of {TOUR_STOPS.length}
                  </span>
                  <h3>{stop.heading}</h3>
                  <p>{stop.line}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="container tour__end">{children}</div>
    </section>
  );
}
