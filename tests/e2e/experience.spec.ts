import { expect, test } from "@playwright/test";
import { experienceContent } from "../../src/content/experience";

test.describe("experience", () => {
  test("renders all experience rows in order and CV download menu works", async ({ page }) => {
    await page.goto("/");
    const section = page.getByTestId("experience-section");
    const rows = section.getByTestId("experience-rows").locator("> div");
    await expect(rows).toHaveCount(experienceContent.rows.length);

    for (let i = 0; i < experienceContent.rows.length; i++) {
      await expect(rows.nth(i)).toContainText(experienceContent.rows[i].company);
      await expect(rows.nth(i)).toContainText(experienceContent.rows[i].years);
    }

    await section.getByRole("button", { name: "Download CV" }).click();
    await expect(section.getByRole("menu", { name: "Choose CV version" })).toBeVisible();
  });
});
