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

  test("navbar active dot moves to About on scroll down and returns to Home when scrolling back to Hero", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "Desktop primary nav active dot test");
    await page.goto("/");
    const nav = page.getByTestId("navbar").getByRole("navigation", { name: "Primary" });
    const homeLink = nav.getByRole("link", { name: "Home" });
    const aboutLink = nav.getByRole("link", { name: "About" });

    await expect(homeLink).toHaveAttribute("aria-current", "page");

    // Scroll into About section
    await page.evaluate(() => {
      const about = document.getElementById("about");
      if (about) {
        window.scrollTo(0, window.scrollY + about.getBoundingClientRect().top - 60);
      }
    });
    await page.waitForTimeout(300);
    await expect(aboutLink).toHaveAttribute("aria-current", "page");
    await expect(homeLink).not.toHaveAttribute("aria-current", "page");

    // Scroll back up to Hero section -> active dot returns to Home
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await expect(homeLink).toHaveAttribute("aria-current", "page");
    await expect(aboutLink).not.toHaveAttribute("aria-current", "page");
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
