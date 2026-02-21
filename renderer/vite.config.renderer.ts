import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tailwindShadowDom, rewriteEntryLoader } from "./vite-plugins";

/**
 * ESM build for the renderer bundle.
 *
 * Produces a code-split ESM entry (dist/renderer.js) plus lazy chunks for
 * heavy features (charts, code highlighting, calendar, icons). The entry
 * assigns `window.__prefab = { mountPreview }` on load.
 *
 * Published to npm as part of @prefecthq/prefab-ui; loaded from CDN in docs.
 * Chunks use relative imports so they resolve from whatever origin serves
 * the entry script — CDN, local dev server, or same-origin static files.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom(), rewriteEntryLoader()],
  // Library mode doesn't replace process.env.NODE_ENV by default (it assumes
  // another bundler will). Since this bundle runs directly in the browser, we
  // need to do it ourselves.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/embed.tsx"),
      formats: ["es"],
      fileName: () => "renderer.js",
    },
    rollupOptions: {
      output: {
        // Mintlify inlines all .js files from docs/ into its RSC payload
        // as non-module scripts, breaking ESM chunks. Using .mjs extension
        // avoids this — Mintlify only processes .js files.
        chunkFileNames: "_chunks/[name]-[hash].mjs",
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
