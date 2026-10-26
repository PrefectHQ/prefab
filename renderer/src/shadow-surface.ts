/** DOM resources shared by documentation embeds and the live playground. */
import {
  docsShadowCss,
  playgroundShadowCss,
  portalShadowCss,
  toSurfaceCss,
} from "./shadow-surface-styles";
import { inlineCssEntries, stylesheetUrls } from "./style-assets";
import { acquireShadowFonts } from "./shadow-fonts";

export type ShadowLayout = "docs" | "playground";
export interface ShadowSurface {
  mount: HTMLDivElement;
  portal: HTMLDivElement;
  roots: readonly [ShadowRoot, ShadowRoot];
  setAssets(css: unknown, stylesheets: unknown): void;
  setDark(dark: boolean): void;
  dispose(): void;
}

export function createShadowSurface(
  host: HTMLElement,
  layout: ShadowLayout,
): ShadowSurface {
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  const originalDark = host.classList.contains("dark");
  const originalMode = host.hasAttribute("data-prefab-dark");
  host.classList.remove("dark");
  let disposed = false;
  let fontKey = "";
  let fonts: ReturnType<typeof acquireShadowFonts> | undefined;
  const portalHost = document.createElement("div");
  portalHost.setAttribute("data-prefab-shadow-portal-host", "");
  // This host must sit outside scrolling/transformed preview ancestors. Keep
  // it transparent to pointer events; each portaled child is interactive.
  Object.assign(portalHost.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9998",
    pointerEvents: "none",
    overflow: "hidden",
    background: "transparent",
  });
  const portalShadow = portalHost.attachShadow({ mode: "open" });
  const base = document.createElement("style");
  base.textContent = layout === "docs" ? docsShadowCss : playgroundShadowCss;
  shadow.append(base);
  const portalBase = document.createElement("style");
  portalBase.textContent =
    portalShadowCss +
    `
[data-prefab-portal] { pointer-events: none; }
[data-prefab-portal] > * { pointer-events: auto; }
`;
  const mount = document.createElement("div");
  mount.setAttribute("data-prefab-mount", "");
  shadow.append(mount);
  const portal = document.createElement("div");
  portal.setAttribute("data-prefab-portal", "");
  portalShadow.append(portalBase, portal);
  document.body.append(portalHost);
  const roots = [shadow, portalShadow] as const;
  const owned = new Set<Element>([base, mount]);

  return {
    mount,
    portal,
    roots,
    setAssets(css, stylesheets) {
      if (disposed) return;
      const nextFonts = JSON.stringify([
        inlineCssEntries(css),
        stylesheetUrls(stylesheets),
      ]);
      if (fontKey !== nextFonts) {
        const previous = fonts;
        fonts = acquireShadowFonts(css, stylesheets, (error) =>
          console.warn("[Prefab] Unable to load preview fonts", error),
        );
        fontKey = nextFonts;
        previous?.release();
      }
      for (const root of roots) {
        const desired = new Set(stylesheetUrls(stylesheets));
        for (const link of root.querySelectorAll<HTMLLinkElement>(
          "link[data-prefab-shadow-stylesheet]",
        )) {
          if (!desired.delete(link.getAttribute("href") ?? "")) {
            owned.delete(link);
            link.remove();
          }
        }
        for (const url of desired) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          link.setAttribute("data-prefab-shadow-stylesheet", "");
          root.append(link);
          owned.add(link);
        }
        const styles = Array.from(
          root.querySelectorAll<HTMLStyleElement>(
            "style[data-prefab-shadow-css]",
          ),
        );
        const entries = inlineCssEntries(css);
        entries.forEach((entry, index) => {
          const style = styles[index] ?? document.createElement("style");
          style.setAttribute("data-prefab-shadow-css", "");
          const next = toSurfaceCss(entry);
          if (style.textContent !== next) style.textContent = next;
          root.append(style);
          owned.add(style);
        });
        for (const style of styles.slice(entries.length)) {
          owned.delete(style);
          style.remove();
        }
      }
    },
    setDark(dark) {
      if (disposed) return;
      host.toggleAttribute("data-prefab-dark", dark);
      portalHost.toggleAttribute("data-prefab-dark", dark);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      fonts?.release();
      for (const node of owned) node.remove();
      owned.clear();
      portalHost.remove();
      host.classList.toggle("dark", originalDark);
      host.toggleAttribute("data-prefab-dark", originalMode);
    },
  };
}
