/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { staticPageMetadata } from "./build/static-page-metadata";

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPageMetadata()],
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
});
