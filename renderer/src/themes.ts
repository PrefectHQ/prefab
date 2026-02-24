/**
 * Theme resolution and CSS injection.
 *
 * Themes arrive as a `{light: Record<string,string>, dark: Record<string,string>}`
 * object on the protocol envelope.  Keys are CSS variable names without the
 * `--` prefix (e.g. `primary-foreground`).  This module prefixes them and
 * generates a `<style>` block that overrides the default variables.
 */

export interface ThemeDefinition {
  light: Record<string, string>;
  dark: Record<string, string>;
}

/**
 * Resolve a theme from the protocol `"theme"` field.
 *
 * Expects `{light: {...}, dark: {...}}` — returns it directly if valid,
 * or null if the shape is unexpected.
 */
export function resolveTheme(theme: unknown): ThemeDefinition | null {
  if (
    typeof theme !== "object" ||
    theme === null ||
    !("light" in theme) ||
    typeof (theme as Record<string, unknown>).light !== "object"
  ) {
    console.warn("[Prefab] Invalid theme format — expected {light, dark}");
    return null;
  }
  const t = theme as {
    light: Record<string, string>;
    dark?: Record<string, string>;
  };
  return {
    light: t.light,
    dark: t.dark ?? t.light,
  };
}

/** Prefix a variable name with `--` to form a CSS custom property. */
function toCssVar(name: string): string {
  return `--${name}`;
}

/**
 * Build a `<style>` block that overrides theme CSS variables.
 *
 * @param theme - Resolved theme definition with light/dark overrides
 * @param shadowDom - If true, targets `:host`/`:host(.dark)` instead of `:root`/`.dark`
 */
export function buildThemeCss(
  theme: ThemeDefinition,
  shadowDom: boolean,
): string {
  const lightSelector = shadowDom ? ":host" : ":root";
  const darkSelector = shadowDom ? ":host(.dark)" : ".dark";

  const lightVars = Object.entries(theme.light)
    .map(([k, v]) => `  ${toCssVar(k)}: ${v};`)
    .join("\n");

  const darkVars = Object.entries(theme.dark)
    .map(([k, v]) => `  ${toCssVar(k)}: ${v};`)
    .join("\n");

  let css = "";
  if (lightVars) {
    css += `${lightSelector} {\n${lightVars}\n}\n`;
  }
  if (darkVars) {
    css += `${darkSelector} {\n${darkVars}\n}\n`;
  }
  return css;
}
