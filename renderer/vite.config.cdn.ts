import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * CDN build for the main renderer.
 *
 * Produces code-split output from main.tsx — the unified entry point that
 * handles MCP, generative, and standalone modes with runtime Tailwind CSS.
 * Published to npm as part of @prefecthq/prefab-ui and served from jsDelivr.
 *
 * Output:
 *   dist/app/renderer.js   — entry script
 *   dist/app/renderer.css  — base styles
 *   dist/app/*.js          — lazy chunks (charts, content, calendar, icons)
 *
 * The Python CDN template loads these via:
 *   https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@{version}/dist/app/renderer.js
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom()],
  // Relative base so assets resolve from wherever the entry script is loaded.
  // The renderer loads inside sandboxed iframes where the origin differs from
  // the asset server — root-relative paths would fail.
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __LOCAL_BUNDLE__: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/app",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        renderer: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((n) => n.endsWith(".css"))
            ? "renderer[extname]"
            : "[name][extname]",
      },
    },
  },
});
