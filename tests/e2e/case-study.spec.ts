import { expect, test } from "@playwright/test";
import { projects, publishedProjects } from "../../src/content/projects";

test.describe("case studies", () => {
  test("every published project renders cover, metadata, sections, and next project link", async ({
    page,
  }) => {
    for (const p of publishedProjects) {
      const res = await page.goto(`/projects/${p.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.title);
      await expect(page.getByText(p.role)).toBeVisible();
      await expect(page.getByText(p.overview)).toBeVisible();
      await expect(page.getByText(p.approach)).toBeVisible();
      await expect(page.getByText(p.outcome)).toBeVisible();

      const coverWidth = await page
        .locator("header img")
        .first()
        .evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(coverWidth).toBeGreaterThan(0);

      await expect(page.getByRole("link", { name: "All projects" })).toBeVisible();
    }
  });

  test("gallery images render side by side above Overview on desktop and swap into 4:3 main banner on click", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "Desktop side-by-side gallery layout test");
    await page.goto("/projects/supashop");

    const mainBanner = page.getByTestId("case-study-main-banner");
    const mainBox = await mainBanner.boundingBox();
    expect(mainBox).not.toBeNull();
    // Main banner is 4:3 (aspect ratio ~ 1.333)
    expect(mainBox!.width / mainBox!.height).toBeCloseTo(4 / 3, 1);

    const items = page.getByTestId("case-study-gallery-item");
    await expect(items).toHaveCount(2);

    const box0 = await items.nth(0).boundingBox();
    const box1 = await items.nth(1).boundingBox();
    const overviewBox = await page.locator("#overview").boundingBox();

    expect(box0).not.toBeNull();
    expect(box1).not.toBeNull();
    expect(overviewBox).not.toBeNull();

    // Side by side on desktop: same vertical row (y) and second item is to the right of first
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThan(5);
    expect(box1!.x).toBeGreaterThan(box0!.x + box0!.width);

    // Gallery appears above the Overview section
    expect(box0!.y).toBeLessThan(overviewBox!.y);

    // Clicking first gallery card swaps its image into the main 4:3 banner
    const mainImg = mainBanner.locator("img");
    await expect(mainImg).toHaveAttribute("src", /\/images\/projects\/supashop\/cover/);
    await items.nth(0).click();
    await expect(mainImg).toHaveAttribute("src", /\/images\/projects\/supashop\/checkout/);
  });

  test("draft project slugs return 404", async ({ page }) => {
    const drafts = projects.filter((p) => p.draft);
    for (const d of drafts) {
      const res = await page.goto(`/projects/${d.slug}`);
      expect(res?.status()).toBe(404);
    }
  });
});
