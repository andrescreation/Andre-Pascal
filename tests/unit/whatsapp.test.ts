import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds a properly encoded wa.me URL with all fields", () => {
    const url = buildWhatsAppUrl({
      name: "Jane Doe",
      email: "jane@company.com",
      type: "Product UI/UX",
      budget: "$3,000 to $7,000",
      message: "Line 1 & Line 2",
    });

    expect(url.startsWith("https://wa.me/2349039640382?text=")).toBe(true);
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Jane Doe");
    expect(decoded).toContain("jane@company.com");
    expect(decoded).toContain("Product UI/UX");
    expect(decoded).toContain("$3,000 to $7,000");
    expect(decoded).toContain("Line 1 & Line 2");
  });

  it("handles missing budget gracefully", () => {
    const url = buildWhatsAppUrl({
      name: "Alex",
      email: "alex@example.com",
      type: "Brand identity",
      message: "Hello",
    });
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Budget: Not specified");
  });
});
