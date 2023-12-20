import { test, expect } from '@playwright/test';

// this tests that recommendations can successfully be retrieved for a given genre
test('get recommendations for genre test', async ({ page }) => {
  await page.goto('http://localhost:3000/client_auth');
  await page.goto('http://localhost:3000/get_recommendations?seed_genres=k-pop');
  await expect(page.getByText('{"status":"success","data":{"')).toBeVisible();
});