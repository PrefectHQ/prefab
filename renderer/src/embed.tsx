/**
 * Shadow DOM embed entry point for doc previews.
 *
 * Both the preview content and overlay portals render inside shadow roots,
 * giving full CSS isolation from the host page. The portal shadow root lives
 * on document.body so `position: fixed` overlays can use the full viewport.
 */

import { Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Toaster } from "sonner";
import { PortalContainerProvider } from "./portal-container";
import { RenderTree, type ComponentNode } from "./renderer";
import { useStateStore } from "./state";
import { clearAllIntervals } from "./actions";
import { resolveTheme, buildThemeCss } from "./themes";

// Vite processes this through @tailwindcss/vite and the tailwindShadowDom
// plugin, which strips @property declarations and emits initial values as
// regular custom properties. The CSS arrives ready for shadow DOM use.
import rawCss from "./index.css?inline";

// Sonner ships its own CSS for toast positioning, animations, and theming.
// In shadow DOM we need to inject it manually since it can't reach `:root`.
import sonnerCss from "sonner/dist/styles.css?inline";

// --- Shared shadow CSS base ---
// Both the preview and portal shadow roots reuse the same rewritten Tailwind
// CSS. `:root` → `:host` for theme variables, `.dark` → `:host(.dark)` for
// dark mode.
const rewrittenCss = rawCss
  .replace(/:root/g, ":host")
  .replace(/\.dark\s*\{/g, ":host(.dark) {")
  .replace(/\.dark\s+\./g, ":host(.dark) .")
  .replace(/\.dark\s+:/g, ":host(.dark) :");

const fontStack = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

// Preview shadow root: positioned container with background
const shadowCss =
  rewrittenCss +
  sonnerCss +
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
      <Suspense fallback={null}>
        <RenderTree tree={tree} state={state} app={null} />
      </Suspense>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
        }}
      >
        <Toaster />
      </div>
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

  // Parse JSON — envelope uses view/state keys
  const parsed = JSON.parse(json);
  const tree: ComponentNode = parsed.view ?? parsed;
  const reserved = new Set(["view", "state", "theme"]);
  const userData: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed)) {
    if (!reserved.has(k)) userData[k] = v;
  }
  const initialState = { ...userData, ...(parsed.state ?? {}) };

  // Apply theme overrides inside shadow DOM
  if (parsed.theme) {
    const resolved = resolveTheme(
      parsed.theme as string | Record<string, string>,
    );
    if (resolved) {
      const themeStyle = document.createElement("style");
      themeStyle.textContent = buildThemeCss(resolved, true);
      shadow.appendChild(themeStyle);
    }
  }

  // Mount React
  let root: Root | null = createRoot(mount);
  root.render(
    <EmbedPreview
      tree={tree}
      initialState={initialState}
      container={portalContainer}
    />,
  );

  // --- Auto-expand preview when floating content overflows ---
  // Popovers/dropdowns render in a body-level portal shadow root. When they
  // extend below the preview card, pad the host so page content below is
  // pushed down instead of being overlapped. Padding (not min-height) avoids
  // shifting the shadow root's centered content and the trigger position.
  let heightRAF = 0;
  function syncOverflowPadding() {
    cancelAnimationFrame(heightRAF);
    heightRAF = requestAnimationFrame(() => {
      const hostRect = host.getBoundingClientRect();
      let maxBottom = 0;
      for (const child of Array.from(portalContainer.children)) {
        const r = (child as HTMLElement).getBoundingClientRect();
        if (r.height > 0) maxBottom = Math.max(maxBottom, r.bottom);
      }
      const overflow = maxBottom - hostRect.bottom;
      host.style.paddingBottom = overflow > 0 ? `${overflow + 8}px` : "";
    });
  }
  const portalObserver = new MutationObserver(syncOverflowPadding);
  portalObserver.observe(portalContainer, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "data-state"],
  });

  return {
    unmount() {
      portalObserver.disconnect();
      cancelAnimationFrame(heightRAF);
      clearAllIntervals();
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

// Expose public API on window for script-tag consumers.
(window as unknown as Record<string, unknown>).__prefab = { mountPreview };
