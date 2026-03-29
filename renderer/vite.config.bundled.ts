import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * Build the bundled renderer as a single self-contained HTML file.
 *
 * All JS/CSS is inlined so the file can be shipped inside a Python
 * package for airgapped environments — no external
 * requests, no CDN, no CSP domains needed.
 *
 * Uses the same entry point (main.tsx) as the CDN build. The unified
 * bridge handles MCP, generative, and standalone modes.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom(), viteSingleFile()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Always bundle local Prefab source — the bundled renderer ships inside
    // the Python package, so it must use the same version, not PyPI.
    __LOCAL_BUNDLE__: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/bundled",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        renderer: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
