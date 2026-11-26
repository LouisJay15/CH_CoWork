import { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DesksPricing from "./pages/DesksPricing.jsx";
import DayPass from "./pages/DayPass.jsx";
import HotelGuests from "./pages/HotelGuests.jsx";
import Amenities from "./pages/Amenities.jsx";
import Location from "./pages/Location.jsx";
import Faq from "./pages/Faq.jsx";
import Book from "./pages/Book.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import NotFound from "./pages/NotFound.jsx";

// The offline demo build uses hash routing so it can open straight from disk.
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
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
    </Router>
  );
}
