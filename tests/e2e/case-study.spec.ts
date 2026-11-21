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

  test("draft project slugs return 404", async ({ page }) => {
    const drafts = projects.filter((p) => p.draft);
    for (const d of drafts) {
      const res = await page.goto(`/projects/${d.slug}`);
      expect(res?.status()).toBe(404);
    }
  });
});
