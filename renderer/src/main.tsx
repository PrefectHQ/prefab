import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DevPreview } from "./dev-preview";
import { earlyBridge } from "./early-bridge";

// Lazy-import App so the MCP SDK (@modelcontextprotocol/ext-apps) is only
// loaded when we actually need it. The SDK has module-level side effects that
// try to establish a postMessage connection with a host — loading it in
// docpreview/playground mode would spam errors and waste resources.
const App = lazy(() => import("./app").then((m) => ({ default: m.App })));

// CLI `prefab apps preview` injects data via a global variable.
const injected = (window as any).__FASTMCP_PREVIEW__ as
  | {
      tree: any;
      data: Record<string, unknown>;
      state?: Record<string, unknown>;
    }
  | undefined;

const isPlayground = window.location.hash.startsWith("#playground");
const isPreview =
  injected != null ||
  isPlayground ||
  window.location.hash.startsWith("#preview") ||
  window.location.hash.startsWith("#kitchen-sink") ||
  window.location.hash.startsWith("#docpreview");

// In MCP mode, start the bridge connection immediately so we don't miss
// early tool-result messages from hosts with aggressive delivery timing
// (e.g. MCPJam's double-iframe sandbox).
if (!isPreview) {
  earlyBridge.connect();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isPreview ? (
      <DevPreview injected={isPlayground ? undefined : injected} />
    ) : (
      <Suspense fallback={null}>
        <App />
      </Suspense>
    )}
  </StrictMode>,
);
