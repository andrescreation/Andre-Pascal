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

test("no console errors or failed requests across all routes", async ({ page }) => {
  const errors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("favicon")) {
      failedRequests.push(`${res.status()} ${res.url()}`);
    }
  });

  for (const route of ROUTES) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }

  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
