import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...mochaPlugins(process.env as any),
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
