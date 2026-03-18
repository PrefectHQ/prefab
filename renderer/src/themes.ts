/**
 * Theme resolution and CSS injection.
 *
 * Themes arrive on the protocol envelope as:
 *   { light: string, dark: string, css: string }
 *
 * - `light` / `dark` are CSS declarations (no selectors) wrapped in
 *   `:root {}` and `.dark {}` respectively.
 * - `css` is injected as-is for mode-agnostic rules (component overrides, etc.).
 *
 * For backwards compatibility, `light` and `dark` also accept the legacy
 * dict format (`Record<string, string>`), which is converted to declaration
 * strings automatically.
 */

export interface ThemeDefinition {
  light: string;
  dark: string;
  css: string;
}

/**
 * Convert a legacy dict `{ primary: "oklch(...)" }` to a CSS declaration
 * string `--primary: oklch(...);`.
 */
function dictToCss(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => `--${k}: ${v};`)
    .join(" ");
}

/** Coerce a field value (string or legacy dict) to a CSS declaration string. */
function coerceField(val: unknown, fallback: string): string {
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && !Array.isArray(val)) {
    return dictToCss(val as Record<string, string>);
  }
  return fallback;
}

/**
 * Resolve a theme from the protocol `"theme"` field.
 *
 * Accepts both the new string format and the legacy dict format.
 * Returns null if the shape is invalid.
 */
export function resolveTheme(theme: unknown): ThemeDefinition | null {
  if (
    typeof theme !== "object" ||
    theme === null ||
    !("light" in theme || "dark" in theme || "css" in theme)
  ) {
    console.warn("[Prefab] Invalid theme format — expected {light, dark, css}");
    return null;
  }
  const t = theme as Record<string, unknown>;
  const light = coerceField(t.light, "");
  return {
    light,
    dark: coerceField(t.dark, light),
    css: typeof t.css === "string" ? t.css : "",
  };
}

/**
 * Build a `<style>` block from a resolved theme.
 *
 * @param theme - Resolved theme definition
 * @param shadowDom - If true, targets `:host`/`:host(.dark)` instead of `:root`/`.dark`
 */
export function buildThemeCss(
  theme: ThemeDefinition,
  shadowDom: boolean,
): string {
  const lightSelector = shadowDom ? ":host" : ":root";
  const darkSelector = shadowDom ? ":host(.dark)" : ".dark";

  // Hoist @import rules to the top (CSS requires them before other rules)
  const imports: string[] = [];
  let css = theme.css || "";
  if (css) {
    const lines = css.split("\n");
    const rest: string[] = [];
    for (const line of lines) {
      if (line.trim().startsWith("@import")) {
        imports.push(line);
      } else {
        rest.push(line);
      }
    }
    css = rest.join("\n");
  }

  let result = imports.length ? imports.join("\n") + "\n" : "";
  if (theme.light) {
    result += `${lightSelector} {\n  ${theme.light}\n}\n`;
  }
  if (theme.dark) {
    result += `${darkSelector} {\n  ${theme.dark}\n}\n`;
  }
  if (css.trim()) {
    if (shadowDom) {
      css = css
        .replace(/\.dark\s*\{/g, ":host(.dark) {")
        .replace(/\.dark\s+\./g, ":host(.dark) .")
        .replace(/\.dark\s+:/g, ":host(.dark) :");
    }
    result += css + "\n";
  }
  return result;
}
