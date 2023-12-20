import { test, expect } from '@playwright/test';

// this tests that the get_genres endpoints successfully returns a success result
test('get genres success test', async ({ page }) => {
  await page.goto('http://localhost:3000/get_genres');
  await expect(page.getByText('{"status":"success","data":{"')).toBeVisible();
});