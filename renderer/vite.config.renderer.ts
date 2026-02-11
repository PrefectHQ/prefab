import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * IIFE build for the renderer bundle.
 *
 * Produces a single self-contained script (dist/renderer.js) that registers
 * `window.__prefab = { mountPreview }`. Published to npm as part of
 * @prefecthq/prefab-ui; loaded from jsdelivr CDN in the Mintlify docs.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom()],
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
      formats: ["iife"],
      name: "__prefab",
      fileName: () => "renderer.js",
    },
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
