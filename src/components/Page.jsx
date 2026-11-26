import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { PAGES } from "../lib/pages.js";
import { SITE_URL } from "../lib/site.js";
import SkipLink from "./SkipLink.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import StickyWhatsApp from "./StickyWhatsApp.jsx";

const PageContext = createContext({ page: PAGES.home, quote: null, setQuote: () => {} });
export const usePage = () => useContext(PageContext);

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function usePageMeta(page) {
  useEffect(() => {
    document.title = page.title;
    const url = `${SITE_URL}${page.path}`;
    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [page]);
}

/**
 * Every page: skip link, header, <main id="main">, footer and the sticky WhatsApp bar.
 * A calculator on the page reports its live selection through setQuote, so the sticky bar can carry it.
 */
export default function Page({ pageKey, hero = false, stickyTemplate, children }) {
  const page = PAGES[pageKey];
  const [quote, setQuote] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    setQuote(null);
  }, [pathname]);
  usePageMeta(page);
  const value = useMemo(() => ({ page, quote, setQuote }), [page, quote]);
  return (
    <PageContext.Provider value={value}>
      <SkipLink />
      <Header overHero={hero} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <StickyWhatsApp template={stickyTemplate} />
    </PageContext.Provider>
  );
}
