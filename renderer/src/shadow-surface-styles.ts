import rawCss from "./index.css?inline";
import sonnerCss from "sonner/dist/styles.css?inline";
import { toShadowDomCss } from "./themes";

export function toSurfaceCss(css: string): string {
  // A light-DOM .dark class on the shadow host would also match the surrounding
  // document's theme declarations, which outrank normal :host declarations.
  return toShadowDomCss(css)
    .replace(/:host\(\.dark\)/g, ":host([data-prefab-dark])")
    .replace(/:is\(\.dark\s+\*\)/g, ":is(:host([data-prefab-dark]) *)");
}

const rewrittenCss = toSurfaceCss(rawCss);
const fontStack = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

// Preview shadow root: positioned container with background
export const docsShadowCss =
  rewrittenCss +
  sonnerCss +
  `
[data-prefab-mount] {
  position: relative;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans, ${fontStack});
  margin: 0;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
/*
 * The mount is a flex-center container, which makes the prefab root Div
 * a flex item sized to max-content by default. That breaks any descendant
 * using width: 100% (sliders, progress bars, etc.) because they resolve
 * against a content-sized parent. Forcing the root to fill width restores
 * a block-like width cascade inside the preview.
 */
[data-prefab-mount] > .pf-app-root {
  width: 100%;
}
`;

// Portal shadow root: transparent container for overlays
export const portalShadowCss =
  rewrittenCss +
  sonnerCss +
  `
[data-prefab-portal] {
  font-family: var(--font-sans, ${fontStack});
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
`;

export const playgroundShadowCss =
  rewrittenCss +
  sonnerCss +
  `
[data-prefab-mount] {
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
  padding: 1.5rem;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans, ${fontStack});
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
`;
