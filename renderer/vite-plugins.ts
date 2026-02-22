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
 * rewrite the thin entry to a one-liner that loads the real chunk.
 *
 * Chunks use .mjs extension to avoid Mintlify inlining them. On deployed
 * Mintlify, .mjs files can't be served as static assets (the Next.js
 * catch-all returns text/html), so the entry loads them from jsdelivr CDN.
 *
 * Both local dev and the CDN use a stable chunk name (`_renderer/embed.mjs`)
 * so that `renderer.js` never needs updating when a new version is published
 * or the renderer is rebuilt locally. A stable re-export shim is emitted
 * alongside the hashed chunk — internal imports from the shim use relative
 * paths, so all files resolve correctly in both contexts.
 */
export function rewriteEntryLoader(): Plugin {
  const pkg = JSON.parse(
    readFileSync(resolve(__dirname, "package.json"), "utf-8"),
  );
  const cdnBase = `https://cdn.jsdelivr.net/npm/${pkg.name}@latest/dist/`;

  return {
    name: "rewrite-entry-loader",
    enforce: "post",
    generateBundle(_options: NormalizedOutputOptions, bundle: OutputBundle) {
      const entry = bundle["renderer.js"];
      if (!entry || entry.type !== "chunk") return;

      // Find the chunk path from the static import in the generated entry.
      const match = entry.code.match(/from\s+["'](\.\/_renderer\/[^"']+)['"]/);
      if (!match) return;

      // Strip leading "./" to get the chunk subpath (e.g. "_renderer/embed-HASH.mjs").
      const chunkPath = match[1].replace(/^\.\//, "");

      // Emit a stable (unhashed) re-export so the CDN path never changes.
      // The shim re-exports everything from the hashed chunk via a relative
      // import, so all files resolve within the same npm package version.
      const hashedFilename = chunkPath.split("/").pop()!;
      this.emitFile({
        type: "asset",
        fileName: "_renderer/embed.mjs",
        source: `export * from "./${hashedFilename}";\n`,
      });

      entry.code = [
        `(function(){`,
        `var base=window.location.hostname==="localhost"?"/":"${cdnBase}";`,
        `window.__prefabReady=import(base+"_renderer/embed.mjs");`,
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

      const defaults: string[] = [];
      let stripped = code.replace(
        /@property\s+(--[\w-]+)\s*\{[^}]*?initial-value:\s*([^;\\n}]+)[^}]*?\}/g,
        (_match, name: string, value: string) => {
          const trimmed = value.trim();
          if (trimmed) defaults.push(`  ${name}: ${trimmed};`);
          return "";
        },
      );

      stripped = stripped.replace(/@property\s+--[\w-]+\s*\{[^}]*?\}/g, "");

      if (stripped === code) return;

      if (defaults.length === 0) return stripped;

      const prefix = `:root, :host {\\n${defaults.join("\\n")}\\n}\\n`;
      return stripped.replace(
        /(const __vite__css = "|export default ")/,
        `$1${prefix}`,
      );
    },
  };
}
