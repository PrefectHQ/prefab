const PREFAB_CSS_ID = "prefab-css";
const PREFAB_CSS_ATTR = "data-prefab-css";
const PREFAB_STYLESHEET_ATTR = "data-prefab-stylesheet";

export function inlineCssEntries(cssStrings: unknown) {
  if (!Array.isArray(cssStrings)) return [];
  return cssStrings.filter(
    (entry): entry is string =>
      typeof entry === "string" && entry.trim() !== "",
  );
}

export function syncInlineCss(cssStrings: unknown) {
  const existing = Array.from(
    document.head.querySelectorAll<HTMLStyleElement>(
      `style#${PREFAB_CSS_ID}, style[${PREFAB_CSS_ATTR}]`,
    ),
  );
  const cssEntries = inlineCssEntries(cssStrings);

  for (const style of existing) {
    style.remove();
  }

  if (cssEntries.length === 0) {
    return;
  }

  for (const [index, css] of cssEntries.entries()) {
    const style = document.createElement("style");
    if (index === 0) style.id = PREFAB_CSS_ID;
    style.setAttribute(PREFAB_CSS_ATTR, "");
    style.textContent = css;
    document.head.appendChild(style);
  }
}

export function stylesheetUrls(urls: unknown) {
  if (!Array.isArray(urls)) return [];
  return urls.filter(
    (entry): entry is string =>
      typeof entry === "string" && entry.trim() !== "",
  );
}

export function syncStylesheets(urls: unknown) {
  const desired = new Set(stylesheetUrls(urls));
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

export function wireMode(mode: unknown): string | undefined {
  return mode === "light" || mode === "dark" ? mode : undefined;
}

export function applyMode(mode: unknown, fallback?: string) {
  const nextMode = wireMode(mode) ?? wireMode(fallback);
  if (!nextMode) return;
  document.documentElement.classList.toggle("dark", nextMode === "dark");
}
