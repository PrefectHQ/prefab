import type { Plugin, NormalizedOutputOptions, OutputBundle } from "vite";

/**
 * Rewrite the renderer entry to use dynamic import() instead of static import.
 *
 * Mintlify inlines all .js files from the docs directory as non-module
 * <script> tags. Static `import`/`export` statements fail in that context.
 * Dynamic `import()` works in both module and non-module scripts, so we
 * rewrite the thin entry to a one-liner that loads the real chunk.
 *
 * Chunks use a `_chunks/` subdirectory so Mintlify doesn't inline them
 * (it only processes top-level .js files). The absolute path ensures the
 * import resolves correctly regardless of the current page URL.
 */
export function rewriteEntryLoader(): Plugin {
  return {
    name: "rewrite-entry-loader",
    enforce: "post",
    generateBundle(_options: NormalizedOutputOptions, bundle: OutputBundle) {
      const entry = bundle["renderer.js"];
      if (!entry || entry.type !== "chunk") return;

      // Find the chunk path from the static import in the generated entry.
      // Vite generates: import { m as o } from "./_chunks/embed-HASH.js";
      const match = entry.code.match(/from\s+["'](\.\/_chunks\/[^"']+)['"]/);
      if (!match) return;

      // Strip leading "./" to get the chunk subpath (e.g. "_chunks/embed-HASH.js").
      const chunkPath = match[1].replace(/^\.\//, "");

      // Use an absolute path so the import resolves correctly regardless of
      // the current page URL. Mintlify inlines renderer.js as a non-module
      // <script> where dynamic import() resolves relative to the page URL
      // (e.g. /components/button). An absolute path avoids this problem.
      entry.code = `window.__prefabReady=import("/${chunkPath}");\n`;
    },
  };
}

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
