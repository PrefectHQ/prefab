import type { Plugin } from "vite";

/**
 * Tailwind v4 uses @property declarations for internal variables (e.g.
 * --tw-border-style). These are document-level constructs that don't work
 * inside shadow DOM <style> elements. This plugin strips them and emits the
 * initial values as regular custom properties on :root, :host instead.
 */
export function tailwindShadowDom(): Plugin {
  return {
    name: "tailwind-shadow-dom",
    enforce: "post",
    transform(code, id) {
      if (!/\.css($|\?)/.test(id)) return;

      // At enforce:"post", CSS is already wrapped in JS by Vite's CSS handler.
      // The @property blocks are inside a JS string literal with escaped newlines.

      // First pass: extract initial-value from blocks that have one.
      const defaults: string[] = [];
      let stripped = code.replace(
        /@property\s+(--[\w-]+)\s*\{[^}]*?initial-value:\s*([^;\\n}]+)[^}]*?\}/g,
        (_match, name: string, value: string) => {
          const trimmed = value.trim();
          if (trimmed) defaults.push(`  ${name}: ${trimmed};`);
          return "";
        },
      );

      // Second pass: strip remaining @property blocks (no initial-value).
      // These are document-level constructs that are inert inside shadow DOM.
      stripped = stripped.replace(/@property\s+--[\w-]+\s*\{[^}]*?\}/g, "");

      if (stripped === code) return;

      if (defaults.length === 0) return stripped;

      // Prepend the :root, :host block into the CSS string inside the JS module.
      const prefix = `:root, :host {\\n${defaults.join("\\n")}\\n}\\n`;
      return stripped.replace(
        /(const __vite__css = "|export default ")/,
        `$1${prefix}`,
      );
    },
  };
}
