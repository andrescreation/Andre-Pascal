import { expect, test } from "@playwright/test";
import { projects, publishedProjects } from "../../src/content/projects";

test.describe("SEO and metadata", () => {
  test("sitemap.xml lists all published routes and excludes drafts", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();

    expect(body).toContain("https://andrescreation.vercel.app");
    expect(body).toContain("https://andrescreation.vercel.app/projects");
    for (const p of publishedProjects) {
      expect(body).toContain(`/projects/${p.slug}`);
    }
    for (const d of projects.filter((p) => p.draft)) {
      expect(body).not.toContain(`/projects/${d.slug}`);
    }
  });

  test("robots.txt exists and points to sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Sitemap: https://andrescreation.vercel.app/sitemap.xml");
  });

  test("home has valid JSON-LD Person schema", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd!);
    const graph = parsed["@graph"] as Array<Record<string, unknown>>;
    const person = graph.find((item) => item["@type"] === "Person");
    expect(person).toBeTruthy();
    expect(person!.name).toBe("Andre Pascal");
    expect(person!.email).toBe("andrescreation1@gmail.com");
    expect(person!.url).toBe("https://andrescreation.vercel.app");
  });

  test("routes have unique titles, descriptions, canonicals, and reachable OG images", async ({
    page,
    request,
  }) => {
    const routes = [
      "/",
      "/projects",
      "/projects/pepsa",
      "/about",
      "/skills",
      "/experience",
      "/contact",
    ];
    const titles = new Set<string>();

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      titles.add(title);

      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc && desc.length > 20).toBeTruthy();

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBeTruthy();

      const ogImg = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(ogImg).toBeTruthy();
      const pathname = new URL(ogImg!).pathname;
      const imgRes = await request.get(pathname);
      expect(imgRes.status()).toBe(200);
    }

    expect(titles.size).toBe(routes.length);
  });
});
