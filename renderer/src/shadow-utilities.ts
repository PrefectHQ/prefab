/** Runtime utilities for classes added to the two owned shadow trees. */
import type { createShadowTailwindCompiler } from "./shadow-tailwind";

export function startShadowUtilities(
  roots: readonly ShadowRoot[],
  onError: (error: unknown) => void,
) {
  let disposed = false;
  let queued = false;
  let previous = "";
  let compiler:
    Awaited<ReturnType<typeof createShadowTailwindCompiler>> | undefined;
  const styles: HTMLStyleElement[] = [];
  const refresh = () => {
    if (disposed || !compiler) return;
    const classes = new Set<string>();
    for (const root of roots) {
      for (const element of root.querySelectorAll("[class]")) {
        for (const token of element.classList) classes.add(token);
      }
    }
    const key = JSON.stringify([...classes].sort());
    if (key === previous) return;
    previous = key;
    const css = compiler.build(classes);
    for (const style of styles)
      if (style.textContent !== css) style.textContent = css;
  };
  const schedule = () => {
    if (disposed || queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      try {
        refresh();
      } catch (error) {
        onError(error);
      }
    });
  };
  const observer = new MutationObserver(schedule);
  for (const root of roots)
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  const ready = import("./shadow-tailwind")
    .then(async ({ createShadowTailwindCompiler }) => {
      compiler = await createShadowTailwindCompiler();
      if (disposed) return;
      for (const root of roots) {
        const style = document.createElement("style");
        style.setAttribute("data-prefab-shadow-utilities", "");
        // Keep theme assets after utilities without moving live mount nodes.
        root.insertBefore(
          style,
          root.querySelector(
            "[data-prefab-shadow-stylesheet], [data-prefab-shadow-css]",
          ) ?? null,
        );
        styles.push(style);
      }
      refresh();
    })
    .catch((error) => {
      if (!disposed) onError(error);
    });
  return {
    ready,
    dispose() {
      disposed = true;
      observer.disconnect();
      for (const style of styles) style.remove();
    },
  };
}
