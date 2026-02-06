import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3333,
    strictPort: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: path.resolve(__dirname, "renderer.html"),
      output: {
        entryFileNames: "assets/renderer.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
