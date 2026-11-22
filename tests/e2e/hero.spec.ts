import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { heroContent } from "../../src/content/hero";

test.describe("hero", () => {
  test("renders exact copy and CTAs", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByTestId("hero-section");
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("PORT-");
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("FOLIO");
    await expect(hero.getByText(heroContent.roleLine)).toBeVisible();
    await expect(hero.getByText(heroContent.intro)).toBeVisible();
    await expect(hero.getByRole("link", { name: heroContent.primaryCta.label })).toBeVisible();
    await expect(hero.getByRole("button", { name: heroContent.secondaryCta.label })).toBeVisible();
  });

  test("vertical phones and reduced-motion show poster only; landscape mobile, tablets/iPads, and desktop show video", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    const hero = page.getByTestId("hero-section");
    const video = hero.locator("video");

    const hasHeroVideo = fs.existsSync(path.join(process.cwd(), "public", "video", "hero.mp4"));

    if (
      !hasHeroVideo ||
      testInfo.project.name === "chromium-mobile" ||
      testInfo.project.name === "chromium-reduced"
    ) {
      await expect(video).toHaveCount(0);
      await expect(hero.getByAltText(heroContent.posterAlt)).toBeVisible();
    } else {
      await expect(video).toHaveCount(1);
      await expect(video).toHaveAttribute("playsinline", "");
      await expect(video).toHaveAttribute("poster", heroContent.poster);
      const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted);
      expect(isMuted).toBe(true);
    }

    if (hasHeroVideo && testInfo.project.name === "chromium-mobile") {
      // Rotate mobile phone to landscape (844x390) -> video should appear
      await page.setViewportSize({ width: 844, height: 390 });
      await expect(video).toHaveCount(1);

      // Rotate back to vertical phone (390x844) -> video should be removed
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(video).toHaveCount(0);

      // Resize to iPad / tablet portrait (768x1024) -> video should appear
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(video).toHaveCount(1);
    }
  });

  test("Download CV opens menu with two valid PDF links", async ({ page, request }) => {
    await page.goto("/");
    const hero = page.getByTestId("hero-section");
    await hero.getByRole("button", { name: "Download CV" }).click();
    const menu = hero.getByRole("menu", { name: "Choose CV version" });
    await expect(menu).toBeVisible();

    const links = menu.getByRole("menuitem");
    await expect(links).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      const res = await request.get(href!);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("application/pdf");
    }
  });
});
