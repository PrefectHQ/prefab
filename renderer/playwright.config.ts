import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./browser",
  use: {
    baseURL: "http://127.0.0.1:3349",
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 3349",
    url: "http://127.0.0.1:3349",
    reuseExistingServer: !process.env.CI,
  },
});
