import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    (() => {
      const emailsConfigPath =
        process.env.MOCHA_EMAILS_WRANGLER_CONFIG_PATH ??
        path.resolve(__dirname, "emails-service", "wrangler.json");

      const auxiliaryWorkers = fs.existsSync(emailsConfigPath)
        ? [{ configPath: emailsConfigPath }]
        : [];

      return cloudflare({
        auxiliaryWorkers,
      });
    })(),
  ],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
