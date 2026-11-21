import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";

describe("CV PDFs", () => {
  it("ensures both CV PDFs exist in public/cv/ and are under 2 MB", () => {
    for (const cv of site.cvOptions) {
      const filePath = path.join(process.cwd(), "public", cv.href);
      expect(fs.existsSync(filePath), `Missing ${filePath}`).toBe(true);
      const mb = fs.statSync(filePath).size / (1024 * 1024);
      expect(mb).toBeLessThanOrEqual(2);
    }
  });
});
