/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { staticPageMetadata } from "./build/static-page-metadata";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    staticPageMetadata(loadEnv(mode, process.cwd(), "VITE_").VITE_SITE_URL),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
  },
}));
