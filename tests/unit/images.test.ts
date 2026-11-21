import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

describe("image and media budgets", () => {
  it("keeps card WebPs under 120 KB and full WebPs under 300 KB", () => {
    const files = walk(path.join(PUBLIC_DIR, "images"));
    for (const file of files) {
      const kb = fs.statSync(file).size / 1024;
      if (file.endsWith("-card.webp")) {
        expect(kb, `${file} exceeds 120KB`).toBeLessThanOrEqual(120);
      } else if (file.endsWith("-full.webp")) {
        expect(kb, `${file} exceeds 300KB`).toBeLessThanOrEqual(300);
      }
    }
  });

  it("keeps hero poster under 200 KB and hero video (if present) under 5 MB", () => {
    const poster = path.join(PUBLIC_DIR, "images", "hero-poster.webp");
    expect(fs.existsSync(poster)).toBe(true);
    expect(fs.statSync(poster).size / 1024).toBeLessThanOrEqual(200);

    const video = path.join(PUBLIC_DIR, "video", "hero.mp4");
    if (fs.existsSync(video)) {
      expect(fs.statSync(video).size / (1024 * 1024)).toBeLessThanOrEqual(5);
    }
  });

  it("keeps non-OG/non-favicon png/jpg files in public/ under 150 KB", () => {
    const files = walk(PUBLIC_DIR);
    for (const file of files) {
      const rel = path.relative(PUBLIC_DIR, file);
      if (rel.startsWith("og/") || rel.startsWith("brand/")) continue;
      if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")) {
        const kb = fs.statSync(file).size / 1024;
        expect(kb, `${rel} exceeds 150KB`).toBeLessThanOrEqual(150);
      }
    }
  });
});
