import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MAIN_NAV, NAV_LABELS, PAGES } from "../lib/pages.js";
import { useScrolled } from "../lib/media.js";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { usePage } from "./Page.jsx";
import { CloseIcon, MenuIcon } from "./Icons.jsx";

const navLabel = (key) => NAV_LABELS[key] ?? PAGES[key].name;

function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label="Charles Hope Cowork, home">
      <span>Charles Hope</span>
      <span className="logo__cowork">Cowork</span>
    </Link>
  );
}

function MobileMenu({ open, onClose, returnFocusTo }) {
  const panelRef = useRef(null);
  const { page } = usePage();

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel.querySelectorAll("a[href], button:not([disabled])"));
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      returnFocusTo.current?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;
  return (
    <>
      <div className="menu-overlay" onClick={onClose} aria-hidden="true" />
      <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef} id="site-menu">
        <div className="menu-panel__top">
          <Logo onClick={onClose} />
          <button type="button" className="menu-button menu-close" onClick={onClose}>
            <CloseIcon />
            <span>Close</span>
          </button>
        </div>
        <nav aria-label="Main">
          <ul>
            {MAIN_NAV.map((key) => (
              <li key={key}>
                <NavLink to={PAGES[key].path} onClick={onClose}>
                  {navLabel(key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton page={page.name} label="WhatsApp us" fullWidth />
      </div>
    </>
  );
}

export default function Header({ overHero = false }) {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const { pathname } = useLocation();
  const { page, quote } = usePage();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const clear = overHero && !scrolled && !open;

  return (
    <header className={`site-header ${clear ? "site-header--clear on-dark" : ""}`}>
      <div className="container site-header__inner">
        <Logo />
        <nav className="nav" aria-label="Main">
          <ul>
            {MAIN_NAV.map((key) => (
              <li key={key}>
                <NavLink to={PAGES[key].path}>{navLabel(key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <WhatsAppButton
            className="header-wa"
            page={page.name}
            option={quote?.option}
            estimate={quote?.estimate}
            label="WhatsApp us"
          />
          <button
            ref={buttonRef}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
            <span>Menu</span>
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocusTo={buttonRef} />
    </header>
  );
}
