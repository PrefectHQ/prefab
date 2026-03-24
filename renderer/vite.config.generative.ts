import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * Build the generative UI renderer as a single self-contained HTML file.
 *
 * Like the standard MCP renderer but adds Pyodide support for executing
 * streaming Python code from ontoolinputpartial. Pyodide is loaded from
 * CDN at runtime (not bundled) to keep the HTML size manageable.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom(), viteSingleFile()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Bundle Prefab source into the renderer so we don't need micropip/PyPI.
    __LOCAL_BUNDLE__: "true",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/generative",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        renderer: path.resolve(__dirname, "generative.html"),
      },
    },
  },
});
