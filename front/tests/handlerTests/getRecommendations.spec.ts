import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/client_auth');
  await page.goto('http://localhost:3000/get_recommendations?seed_genres=k-pop');
  await expect(page.getByText('{"status":"success","data":{"')).toBeVisible();
});