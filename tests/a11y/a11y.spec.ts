import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/projects",
  "/projects/pepsa",
  "/about",
  "/skills",
  "/experience",
  "/contact",
];

test.describe("accessibility", () => {
  for (const scheme of ["light", "dark"] as const) {
    for (const route of ROUTES) {
      test(`${route} (${scheme} mode) has zero serious or critical axe violations`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(route);
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        );
        expect(serious).toEqual([]);
      });
    }
  }
});
