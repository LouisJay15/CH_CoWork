import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";

// Home loads with the first visit; every other page is fetched when it is opened (smaller first download).
const DesksPricing = lazy(() => import("./pages/DesksPricing.jsx"));
const DayPass = lazy(() => import("./pages/DayPass.jsx"));
const HotelGuests = lazy(() => import("./pages/HotelGuests.jsx"));
const Amenities = lazy(() => import("./pages/Amenities.jsx"));
const Location = lazy(() => import("./pages/Location.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Book = lazy(() => import("./pages/Book.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// The offline demo build uses hash routing so it can open straight from disk.
const HASH = import.meta.env.VITE_ROUTER === "hash";
const Router = HASH ? HashRouter : BrowserRouter;
// On GitHub Pages the site lives under /<repository>/.
const basename = HASH ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Suspense fallback={<div style={{ minHeight: "100svh" }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desks-and-pricing" element={<DesksPricing />} />
        <Route path="/day-pass" element={<DayPass />} />
        <Route path="/hotel-guests" element={<HotelGuests />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/location" element={<Location />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/book" element={<Book />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
  );
}
