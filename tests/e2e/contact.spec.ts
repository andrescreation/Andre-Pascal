import { expect, test } from "@playwright/test";
import { contactContent } from "../../src/content/contact";
import { site } from "../../src/content/site";

test.describe("contact", () => {
  test("renders centered heading, subtext, and all platform links without form", async ({
    page,
  }) => {
    await page.goto("/contact");
    const section = page.getByTestId("contact-section");

    await expect(section.locator("form")).toHaveCount(0);
    await expect(section.getByRole("heading", { name: contactContent.heading })).toBeVisible();
    await expect(section.getByText(contactContent.paragraph)).toBeVisible();

    const line1 = section.getByTestId("contact-heading-line-1");
    const line2 = section.getByTestId("contact-heading-line-2");
    await expect(line1).toHaveText("LET'S BUILD");
    await expect(line2).toHaveText("SOMETHING");
    const line1Box = await line1.boundingBox();
    const line2Box = await line2.boundingBox();
    expect(line1Box).not.toBeNull();
    expect(line2Box).not.toBeNull();
    expect(line2Box!.y).toBeGreaterThan(line1Box!.y);

    const expectedLinks = [
      { name: "WhatsApp", href: site.whatsappUrl },
      { name: "Email", href: `mailto:${site.email}` },
      { name: "GitHub", href: site.githubUrl },
      { name: "LinkedIn", href: site.linkedinUrl! },
      { name: "Instagram", href: site.instagramUrl! },
      { name: "X", href: site.xUrl! },
    ];

    for (const item of expectedLinks) {
      const link = section.getByRole("link", { name: item.name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", item.href);
    }
  });

  test("renders home contact heading split across two lines after scrolling", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

    const section = page.getByTestId("contact-section");
    const line1 = section.getByTestId("contact-heading-line-1");
    const line2 = section.getByTestId("contact-heading-line-2");
    await expect(line1).toHaveText("LET'S BUILD");
    await expect(line2).toHaveText("SOMETHING");
    const line1Box = await line1.boundingBox();
    const line2Box = await line2.boundingBox();
    expect(line1Box).not.toBeNull();
    expect(line2Box).not.toBeNull();
    expect(line2Box!.y).toBeGreaterThan(line1Box!.y);
  });
});
