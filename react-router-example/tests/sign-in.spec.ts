import { expect, test } from "@playwright/test";

const credentials = {
	email: process.env.MOCKATOO_TEST_EMAIL,
	password: process.env.MOCKATOO_TEST_PASSWORD,
};

test("a provider button reaches Mockatoo's email form", async ({ page }) => {
	await page.goto("/sign-in");
	await page.getByRole("button", { name: "Continue with GitHub" }).click();
	await expect(page.getByRole("textbox", { name: "Email", exact: true })).toBeVisible();
});

test("a Mockatoo account can sign in", async ({ page }) => {
	if (!credentials.email || !credentials.password) {
		console.log("::notice::Skipping full sign-in test: Mockatoo credentials are not configured");
		test.skip();
	}
	await page.goto("/sign-in");
	await page.getByRole("button", { name: "Continue with GitHub" }).click();
	await page.getByRole("textbox", { name: "Email", exact: true }).fill(credentials.email);
	await page.getByLabel("Password").fill(credentials.password);
	await page.getByRole("button", { name: "Log in with password" }).click();
	await page.getByRole("button", { name: "Authorize" }).click();
	await expect(page).toHaveURL(/dashboard/);
});
