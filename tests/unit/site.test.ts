import { describe, expect, it } from "vitest";
import { site } from "@/content/site";

describe("site identity", () => {
  it("matches 03_SITE_CONTENT.md section 0.1", () => {
    expect(site.email).toBe("andrescreation1@gmail.com");
    expect(site.phone).toBe("+234 903 964 0382");
    expect(site.whatsappUrl).toBe("https://wa.me/2349039640382");
    expect(site.githubUrl).toBe("https://github.com/andrescreation");
    expect(site.linkedinUrl).toBe("https://www.linkedin.com/in/andre-pascal-%E5%BE%97-5b6702235");
    expect(site.instagramUrl).toBe("https://www.instagram.com/andreofficial_x/");
    expect(site.xUrl).toBe("https://x.com/andreOfficial_x");
    expect(site.siteUrl).toBe("https://andrescreation.vercel.app");
  });

  it("has no empty string links", () => {
    for (const link of site.navLinks) {
      expect(link.href.trim().length).toBeGreaterThan(0);
    }
    for (const cv of site.cvOptions) {
      expect(cv.href.trim().length).toBeGreaterThan(0);
    }
  });
});
