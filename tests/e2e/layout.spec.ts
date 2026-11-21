import { expect, test } from "@playwright/test";

const WIDTHS = [320, 375, 768, 1024, 1280, 1440, 1920];
const SUB_ROUTES = ["/projects", "/about", "/skills", "/experience", "/contact"];

test("no horizontal scroll across widths on home and sub-pages", async ({ page }) => {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasOverflow, `Horizontal overflow at width ${width} on /`).toBe(false);
  }

  for (const route of SUB_ROUTES) {
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(hasOverflow, `Horizontal overflow at width ${width} on ${route}`).toBe(false);
    }
  }
});

test("interactive controls on mobile meet 44x44px tap-target minimum", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const controls = page.locator(
    'button:visible, [role="tab"]:visible, [data-testid="navbar"] a:visible',
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const box = await controls.nth(i).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width, `Control #${i} width < 44px`).toBeGreaterThanOrEqual(43.5);
    expect(box!.height, `Control #${i} height < 44px`).toBeGreaterThanOrEqual(43.5);
  }
});
