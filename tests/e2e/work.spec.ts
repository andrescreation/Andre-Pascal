import { expect, test } from "@playwright/test";
import { publishedProjects } from "../../src/content/projects";

test.describe("work and projects", () => {
  test("marquee rows animate in opposite directions, pause on hover, and apply edge mask", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Desktop marquee test runs on chromium-desktop",
    );

    await page.goto("/");
    const row1 = page.getByTestId("marquee-row-1");
    const row2 = page.getByTestId("marquee-row-2");

    await expect(row1).toBeVisible();
    await expect(row2).toBeVisible();

    const anim1 = await row1.evaluate((el) => getComputedStyle(el).animationName);
    const anim2 = await row2.evaluate((el) => getComputedStyle(el).animationName);
    expect(anim1).toContain("marquee-left");
    expect(anim2).toContain("marquee-right");

    const mask = await page
      .locator(".marquee-mask")
      .evaluate((el) => getComputedStyle(el).maskImage || getComputedStyle(el).webkitMaskImage);
    expect(mask).toContain("linear-gradient");

    await page.locator(".marquee-container").scrollIntoViewIfNeeded();
    await page.locator(".marquee-container").hover({ position: { x: 200, y: 100 } });
    const t1 = await row1.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(500);
    const t2 = await row1.evaluate((el) => getComputedStyle(el).transform);
    expect(t1).toBe(t2);
  });

  test("reduced motion shows static 3-col grid", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-reduced",
      "Reduced motion grid test runs on chromium-reduced",
    );
    await page.goto("/");
    await expect(page.getByTestId("work-static-grid")).toBeVisible();
    await expect(page.getByTestId("marquee-row-1")).toHaveCount(0);
  });

  test("/projects filters by category", async ({ page }) => {
    await page.goto("/projects");
    const grid = page.getByTestId("projects-grid");
    await expect(grid.locator("a")).toHaveCount(publishedProjects.length);

    await page.getByRole("button", { name: "Brand" }).click();
    const brandCount = publishedProjects.filter((p) => p.category.includes("Brand")).length;
    await expect(grid.locator("a")).toHaveCount(brandCount);

    await page.getByRole("button", { name: "All" }).click();
    await expect(grid.locator("a")).toHaveCount(publishedProjects.length);
  });
});
