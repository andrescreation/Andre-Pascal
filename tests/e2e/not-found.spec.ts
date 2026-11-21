import { expect, test } from "@playwright/test";

test("custom 404 page renders on unknown route", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  await expect(
    page.getByText("This page doesn't exist, or it moved. Let's get you back."),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
