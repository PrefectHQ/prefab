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
 * Published to npm as part of @prefecthq/prefab-ui. Chunks use relative
 * imports so they resolve from whatever origin serves the entry script.
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
        // Chunks use .mjs so Mintlify doesn't inline them as <script> tags
        // (it only inlines .js files). On deployed Mintlify the entry loader
        // imports these from CDN; local dev serves them directly.
        chunkFileNames: "_renderer/[name]-[hash].mjs",
        manualChunks(id) {
          // The full lucide-react icon barrel (~500-800KB) is lazy-loaded
          // via icons-barrel.ts. Force it into its own chunk so the barrel
          // doesn't get pulled into the core embed chunk. Individual icon
          // imports (Check, X, etc.) used by UI primitives are NOT matched
          // here — they stay in core via tree-shaking.
          if (id.includes("icons-barrel")) {
            return "icons";
          }
        },
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
