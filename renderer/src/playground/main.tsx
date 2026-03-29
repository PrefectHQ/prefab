import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@tailwindcss/browser";
import "../index.css";
import { Playground } from "./playground";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
