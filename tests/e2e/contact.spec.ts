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
});
