import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SunoBuilder from "./SunoBuilder";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SunoBuilder />
  </StrictMode>
);
