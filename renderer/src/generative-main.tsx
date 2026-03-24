/**
 * Entry point for the generative UI renderer.
 *
 * Connects the generative bridge (with ontoolinputpartial support)
 * before React mounts, then renders the GenerativeApp.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { generativeBridge } from "./generative-bridge";
import { GenerativeApp } from "./generative-app";

// Connect immediately so we don't miss early partial inputs
generativeBridge.connect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GenerativeApp />
  </StrictMode>,
);
