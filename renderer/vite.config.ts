import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tailwindShadowDom } from "./vite-plugins";

export default defineConfig({
  plugins: [react(), tailwindcss(), tailwindShadowDom()],
  // Relative base so that built assets resolve against the importing module's
  // URL, not the document root.  The renderer HTML is loaded inside a
  // sandboxed iframe whose origin differs from the asset server — root-
  // relative paths (the default "/") would resolve against the iframe origin
  // and fail.  With "./", dynamic imports and CSS preloads resolve relative
  // to the module that triggered them, which is loaded from the correct origin.
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: parseInt(process.env.RENDERER_PORT || "3333", 10),
    strictPort: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        renderer: path.resolve(__dirname, "renderer.html"),
        playground: path.resolve(__dirname, "playground.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        // CSS gets named after the chunk it's extracted from (e.g. "state.css")
        // which is non-deterministic.  Force CSS to "renderer.css" so the
        // Python HTML stub can reference it with a stable name.
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((n) => n.endsWith(".css"))
            ? "assets/renderer[extname]"
            : "assets/[name][extname]",
      },
    },
  },
});
