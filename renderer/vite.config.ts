import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Tailwind v4 uses @property declarations for internal variables (e.g.
// --tw-border-style). These are document-level constructs that don't work
// inside shadow DOM <style> elements. This plugin strips them and emits the
// initial values as regular custom properties on :root, :host instead.
function tailwindShadowDom(): Plugin {
  return {
    name: "tailwind-shadow-dom",
    enforce: "post",
    transform(code, id) {
      if (!/\.css($|\?)/.test(id)) return;

      // At enforce:"post", CSS is already wrapped in JS by Vite's CSS handler.
      // The @property blocks are inside a JS string literal with escaped newlines.

      // First pass: extract initial-value from blocks that have one.
      const defaults: string[] = [];
      let stripped = code.replace(
        /@property\s+(--[\w-]+)\s*\{[^}]*?initial-value:\s*([^;\\n}]+)[^}]*?\}/g,
        (_match, name: string, value: string) => {
          const trimmed = value.trim();
          if (trimmed) defaults.push(`  ${name}: ${trimmed};`);
          return "";
        },
      );

      // Second pass: strip remaining @property blocks (no initial-value).
      // These are document-level constructs that are inert inside shadow DOM.
      stripped = stripped.replace(/@property\s+--[\w-]+\s*\{[^}]*?\}/g, "");

      if (stripped === code) return;

      if (defaults.length === 0) return stripped;

      // Prepend the :root, :host block into the CSS string inside the JS module.
      const prefix = `:root, :host {\\n${defaults.join("\\n")}\\n}\\n`;
      return stripped.replace(
        /(const __vite__css = "|export default ")/,
        `$1${prefix}`,
      );
    },
  };
}

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
