import { test, expect } from "@playwright/test";

// this tests that the client_auth endpoint successfully redirects
test("initial auth successfully redirects", async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/client_auth');
    await expect(page.getByText('{"status":"success","data":"')).toBeVisible();
  });