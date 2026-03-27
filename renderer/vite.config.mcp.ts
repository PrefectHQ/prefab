import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import { tailwindShadowDom } from "./vite-plugins";

/**
 * Build the MCP generative renderer as a single self-contained HTML file.
 *
 * All JS/CSS is inlined so the file can be shipped inside the Python
 * package and returned directly as a ui:// resource — no external
 * server, CDN, or CSP domains needed.
 *
 * IMPORTANT: mcp.html MUST reference generative-main.tsx (not main.tsx).
 * The generative entry point includes the Pyodide executor and streaming
 * bridge. Using main.tsx silently ships the wrong app.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom(), viteSingleFile()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Always bundle local Prefab source — the MCP renderer ships inside
    // the Python package, so it must use the same version, not PyPI.
    __LOCAL_BUNDLE__: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/mcp",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        renderer: path.resolve(__dirname, "mcp.html"),
      },
    },
  },
});
