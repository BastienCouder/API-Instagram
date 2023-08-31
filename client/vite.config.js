// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "src/main.js",
    },
  },
  server: {
    // Configuration du serveur Vite
    open: true,
    proxy: {},
  },
  publicDir: "public",
});
