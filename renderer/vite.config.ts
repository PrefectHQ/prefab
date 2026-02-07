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
      input: {
        renderer: path.resolve(__dirname, "renderer.html"),
        playground: path.resolve(__dirname, "playground.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
