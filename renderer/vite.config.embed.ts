import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * IIFE build for the embed module.
 *
 * Produces a single self-contained script (docs/embed.js) that registers
 * `window.__prefab = { mountPreview }`. Mintlify auto-injects .js files from
 * the docs directory as <script> tags on every page, so the IIFE executes
 * before any ComponentPreview mounts.
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
      fileName: () => "embed.js",
    },
    outDir: path.resolve(__dirname, "../docs"),
    emptyOutDir: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
