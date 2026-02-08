/**
 * Shadow DOM embed entry point for doc previews.
 *
 * Both the preview content and overlay portals render inside shadow roots,
 * giving full CSS isolation from the host page. The portal shadow root lives
 * on document.body so `position: fixed` overlays can use the full viewport.
 */

import { createRoot, type Root } from "react-dom/client";
import { PortalContainerProvider } from "./portal-container";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";

// Vite processes this through @tailwindcss/vite and returns the complete CSS
// as a string instead of injecting it into the document.
import rawCss from "./index.css?inline";

// --- @property → :host fallback ---
// `@property` declarations don't work inside shadow DOM <style> elements
// (they're document-level constructs). Tailwind v4 relies on @property to set
// initial values for internal variables like --tw-border-style. Extract them
// and emit explicit :host assignments so they resolve inside the shadow root.
function extractPropertyDefaults(css: string): string {
  const defaults: string[] = [];
  const re = /@property\s+(--[\w-]+)\s*\{[^}]*initial-value:\s*([^;\n}]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const value = m[2].trim();
    if (value) defaults.push(`  ${m[1]}: ${value};`);
  }
  return defaults.length ? `:host {\n${defaults.join("\n")}\n}\n` : "";
}

// --- Shared shadow CSS base ---
// Both the preview and portal shadow roots reuse the same rewritten Tailwind
// CSS. `:root` → `:host` for theme variables, `.dark` → `:host(.dark)` for
// dark mode.
const rewrittenCss =
  extractPropertyDefaults(rawCss) +
  rawCss
    .replace(/:root/g, ":host")
    .replace(/\.dark\s*\{/g, ":host(.dark) {")
    .replace(/\.dark\s+\./g, ":host(.dark) .")
    .replace(/\.dark\s+:/g, ":host(.dark) :");

const fontStack = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

// Preview shadow root: positioned container with background
const shadowCss =
  rewrittenCss +
  `
[data-prefab-mount] {
  position: relative;
  background: var(--background);
  color: var(--foreground);
  font-family: ${fontStack};
  margin: 0;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
`;

// Portal shadow root: transparent container for overlays
const portalShadowCss =
  rewrittenCss +
  `
[data-prefab-portal] {
  font-family: ${fontStack};
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
`;

interface MountHandle {
  unmount(): void;
  setDark(dark: boolean): void;
}

function EmbedPreview({
  tree,
  initialState,
  container,
}: {
  tree: ComponentNode;
  initialState: Record<string, unknown>;
  container: HTMLElement;
}) {
  const state = useStateStore(initialState);
  return (
    <PortalContainerProvider container={container}>
      <RenderTree tree={tree} state={state} app={null} />
    </PortalContainerProvider>
  );
}

/**
 * Create a body-level portal host with its own shadow root for overlay content.
 *
 * The shadow root gives full CSS isolation from the host page — no style
 * leakage in either direction. The host element sits directly on document.body
 * so `position: fixed` overlays can use the full viewport.
 */
function getOrCreatePortalHost(id: string, dark: boolean): HTMLElement {
  let host = document.getElementById(id);
  let container: HTMLElement;

  if (!host) {
    host = document.createElement("div");
    host.id = id;
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = portalShadowCss;
    shadow.appendChild(style);

    container = document.createElement("div");
    container.setAttribute("data-prefab-portal", "");
    shadow.appendChild(container);
  } else {
    container = host.shadowRoot!.querySelector("[data-prefab-portal]")!;
  }

  host.classList.toggle("dark", dark);
  return container;
}

export function mountPreview(
  host: HTMLElement,
  json: string,
  options?: { dark?: boolean },
): MountHandle {
  const shadow = host.attachShadow({ mode: "open" });

  // Inject processed CSS
  const style = document.createElement("style");
  style.textContent = shadowCss;
  shadow.appendChild(style);

  // Create mount point inside shadow root
  const mount = document.createElement("div");
  mount.setAttribute("data-prefab-mount", "");
  shadow.appendChild(mount);

  const isDark = options?.dark ?? false;

  // Apply initial dark mode
  if (isDark) {
    host.classList.add("dark");
  }

  // Body-level portal host with shadow DOM for overlays
  const portalId = `prefab-portal-${
    host.id || Math.random().toString(36).slice(2)
  }`;
  const portalContainer = getOrCreatePortalHost(portalId, isDark);

  // Parse JSON
  const parsed = JSON.parse(json);
  const tree: ComponentNode = parsed._tree ?? parsed;
  const userData: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed)) {
    if (k !== "_tree" && k !== "_state") userData[k] = v;
  }
  const initialState = { ...userData, ...(parsed._state ?? {}) };

  // Mount React
  let root: Root | null = createRoot(mount);
  root.render(
    <EmbedPreview
      tree={tree}
      initialState={initialState}
      container={portalContainer}
    />,
  );

  return {
    unmount() {
      root?.unmount();
      root = null;
      document.getElementById(portalId)?.remove();
    },
    setDark(dark: boolean) {
      host.classList.toggle("dark", dark);
      const portalHost = document.getElementById(portalId);
      if (portalHost) portalHost.classList.toggle("dark", dark);
    },
  };
}
