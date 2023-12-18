import { test, expect } from "@playwright/test";

test("auth successfully redirects", async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/client_auth');
    await expect(page.getByText('{"status":"success","data":"')).toBeVisible();
  });