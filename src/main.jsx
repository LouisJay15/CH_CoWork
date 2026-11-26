import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./brand/fonts.js";
import "./brand/brand.css";
import "./reactbits/SpotlightCard.css";
import "./styles/site.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
