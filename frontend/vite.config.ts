import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5050",
    },
  },
  resolve: {
    mainFields: [],
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
