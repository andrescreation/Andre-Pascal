import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects, publishedProjects } from "@/content/projects";

const PUBLIC_DIR = path.join(process.cwd(), "public");

describe("projects content", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("excludes draft projects from publishedProjects", () => {
    for (const p of publishedProjects) {
      expect(p.draft).toBe(false);
    }
    const draftCount = projects.filter((p) => p.draft).length;
    expect(publishedProjects.length).toBe(projects.length - draftCount);
  });

  it("ensures every published project has required copy and images on disk", () => {
    for (const p of publishedProjects) {
      expect(p.summary.length).toBeLessThanOrEqual(110);
      expect(p.overview.length).toBeGreaterThan(0);
      expect(p.approach.length).toBeGreaterThan(0);
      expect(p.outcome.length).toBeGreaterThan(0);
      expect([1, 2]).toContain(p.marqueeRow);
      expect(p.gallery.length, `${p.slug} must have exactly 1 secondary image`).toBe(1);

      for (const base of [p.cover, ...p.gallery]) {
        const cardPath = path.join(PUBLIC_DIR, `${base}-card.webp`);
        const fullPath = path.join(PUBLIC_DIR, `${base}-full.webp`);
        expect(fs.existsSync(cardPath), `Missing ${cardPath}`).toBe(true);
        expect(fs.existsSync(fullPath), `Missing ${fullPath}`).toBe(true);
      }
    }
  });
});
