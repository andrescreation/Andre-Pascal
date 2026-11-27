import { expect, test } from "@playwright/test";
import { aboutContent } from "../../src/content/about";

test.describe("motion", () => {
  test("pull-over, card stack, and navbar z-order on desktop", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Pinned scroll motion runs only on desktop",
    );

    await page.goto("/");
    await page.waitForTimeout(300);

    const hero = page.getByTestId("hero-section");
    const about = page.getByTestId("about-section");

    // At scroll 0, About starts at or below viewport bottom
    const aboutInitial = await about.boundingBox();
    expect(aboutInitial).not.toBeNull();
    expect(aboutInitial!.y).toBeGreaterThanOrEqual(890);

    // Scroll 50vh: About moves up over pinned hero
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.5));
    await page.waitForTimeout(300);
    const heroMid = await hero.boundingBox();
    expect(heroMid!.y).toBeCloseTo(0, 0);

    // Scroll past 80%: hero starts moving up (negative y)
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.92));
    await page.waitForTimeout(300);
    const heroPast = await hero.boundingBox();
    expect(heroPast!.y).toBeLessThan(0);

    // Scroll into About pin and step through all 5 cards
    const pinStartY = await page.evaluate(() => {
      const el = document.getElementById("about");
      if (!el) return 0;
      return window.scrollY + el.getBoundingClientRect().top - 72;
    });

    await page.evaluate((y) => window.scrollTo(0, y + 10), pinStartY);
    await page.waitForTimeout(300);
    await expect(page.getByTestId("about-counter")).toHaveText("01 / 05");
    await expect(page.getByTestId("about-caption")).toHaveText(aboutContent.cards[0].caption);

    // Navbar stays on top
    const navTag = await page.evaluate(() => {
      const el = document.elementFromPoint(720, 36);
      return el?.closest('[data-testid="navbar"]') !== null;
    });
    expect(navTag).toBe(true);

    // Step through cards 2 to 5 (each step = 60vh, total 300vh = 4 transitions of 75vh? 300vh / 4 = 75vh; let's check 02..05)
    for (let step = 1; step <= 4; step++) {
      const offset = windowHeightMultiplier(step);
      await page.evaluate(({ y, mult }) => window.scrollTo(0, y + window.innerHeight * mult), {
        y: pinStartY,
        mult: offset,
      });
      await page.waitForTimeout(350);
      await expect(page.getByTestId("about-counter")).toHaveText(`0${step + 1} / 05`);
      await expect(page.getByTestId("about-caption")).toHaveText(aboutContent.cards[step].caption);
    }

    // Stop scrolling on About section: cards autoplay after idle delay
    await page.evaluate((y) => window.scrollTo(0, y + 10), pinStartY);
    await page.waitForTimeout(300);
    await expect(page.getByTestId("about-counter")).toHaveText("01 / 05");
    await page.waitForTimeout(2700);
    await expect(page.getByTestId("about-counter")).not.toHaveText("01 / 05");
  });

  test("reduced motion renders swipeable carousel instead of pinned stack", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-reduced",
      "Reduced motion test runs on chromium-reduced project",
    );
    await page.goto("/");
    await expect(page.getByTestId("about-carousel")).toBeVisible();
    await expect(page.getByTestId("about-stack")).toHaveCount(0);
  });
});

function windowHeightMultiplier(step: number): number {
  // 5 cards x 60vh = 300vh pin; sample inside each 60vh slot
  const points = [0.05, 0.7, 1.3, 1.9, 2.5];
  return points[step] ?? 2.5;
}
