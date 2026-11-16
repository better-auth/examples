import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	use: {
		baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
		trace: "retain-on-failure",
	},
	webServer: {
		command: "node tests/schema.mjs && pnpm start",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: true,
		timeout: 120_000,
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
