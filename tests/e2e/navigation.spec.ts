import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("home loads with 200 and exact title", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle("Andre Pascal | Brand & Visual Designer and Web Designer");
  });

  test("navbar stays fixed at top across scroll positions", async ({ page }) => {
    await page.goto("/");
    const navbar = page.getByTestId("navbar");
    await expect(navbar).toBeVisible();

    for (const frac of [0, 0.25, 0.5, 0.75, 1]) {
      await page.evaluate((f) => {
        window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * f);
      }, frac);
      await page.waitForTimeout(150);
      const box = await navbar.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBe(0);
    }
  });

  test("mobile menu opens, traps focus, closes on Escape and link click", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile menu test runs on mobile viewport");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "About" }).click();
    await expect(dialog).toBeHidden();
  });

  test("primary nav links navigate to dedicated pages", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "Desktop nav link test");
    await page.goto("/");
    const nav = page.getByTestId("navbar").getByRole("navigation", { name: "Primary" });

    for (const [label, path] of [
      ["Home", "/"],
      ["Projects", "/projects"],
      ["About", "/about"],
      ["Skills", "/skills"],
      ["Experience", "/experience"],
      ["Contact", "/contact"],
    ]) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(path === "/" ? /\/$/ : new RegExp(`${path}$`));
    }
  });
});
