const PREFAB_CSS_ID = "prefab-css";
const PREFAB_STYLESHEET_ATTR = "data-prefab-stylesheet";

export function syncInlineCss(cssStrings: string[] | undefined) {
  const existing = document.getElementById(PREFAB_CSS_ID);
  const css = cssStrings?.filter((s) => s.trim()).join("\n") ?? "";

  if (!css) {
    existing?.remove();
    return;
  }

  if (existing) {
    existing.textContent = css;
    return;
  }

  const style = document.createElement("style");
  style.id = PREFAB_CSS_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export function syncStylesheets(urls: string[] | undefined) {
  const desired = new Set(urls?.filter((url) => url.trim()) ?? []);
  const existing = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>(
      `link[${PREFAB_STYLESHEET_ATTR}]`,
    ),
  );

  for (const link of existing) {
    const href = link.getAttribute("href");
    if (!href || !desired.delete(href)) {
      link.remove();
    }
  }

  for (const url of desired) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute(PREFAB_STYLESHEET_ATTR, "");
    document.head.appendChild(link);
  }
}

export function applyMode(mode: string | undefined, fallback?: string) {
  const nextMode = mode ?? fallback;
  if (!nextMode) return;
  document.documentElement.classList.toggle("dark", nextMode === "dark");
}
