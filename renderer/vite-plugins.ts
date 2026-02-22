import type { Plugin, NormalizedOutputOptions, OutputBundle } from "vite";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Rewrite the renderer entry to use dynamic import() instead of static import.
 *
 * Mintlify inlines all .js files from the docs directory as non-module
 * <script> tags. Static `import`/`export` statements fail in that context.
 * Dynamic `import()` works in both module and non-module scripts, so we
 * rewrite the thin entry to a one-liner that loads the real code from a CDN.
 *
 * Mintlify's deployed hosting routes all URLs through its Next.js catch-all,
 * so .mjs chunk files can't be served as static assets — they're returned as
 * HTML pages. Loading chunks from jsdelivr avoids this: the npm package
 * includes dist/_chunks/ and jsdelivr serves them with correct MIME types.
 *
 * For local dev, set PREFAB_RENDERER_BASE to override the CDN URL
 * (e.g. PREFAB_RENDERER_BASE=/ to use local paths).
 */
export function rewriteEntryLoader(): Plugin {
  return {
    name: "rewrite-entry-loader",
    enforce: "post",
    generateBundle(_options: NormalizedOutputOptions, bundle: OutputBundle) {
      const entry = bundle["renderer.js"];
      if (!entry || entry.type !== "chunk") return;

      // Find the chunk path from the static import in the generated entry.
      // Vite generates: import { m as o } from "./_chunks/embed-HASH.mjs";
      const match = entry.code.match(/from\s+["'](\.\/_chunks\/[^"']+)['"]/);
      if (!match) return;

      // Strip leading "./" to get the chunk subpath (e.g. "_chunks/embed-HASH.mjs").
      const chunkPath = match[1].replace(/^\.\//, "");

      // Read package.json to construct the CDN URL.
      const pkg = JSON.parse(
        readFileSync(resolve(__dirname, "package.json"), "utf-8"),
      );
      const cdnBase = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/`;

      // The entry uses a CDN URL so it works on Mintlify's deployed hosting
      // (which doesn't serve static .mjs files). Local dev can override via
      // the __prefabBase variable set by component-preview.mdx.
      entry.code = [
        `(function(){`,
        `var base=window.location.hostname==="localhost"?"/":"${cdnBase}";`,
        `window.__prefabReady=import(base+"${chunkPath}");`,
        `})();\n`,
      ].join("");
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
