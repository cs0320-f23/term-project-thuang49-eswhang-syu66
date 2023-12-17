import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/get_genres');
  await expect(page.getByText('{"status":"success","data":{"')).toBeVisible();
});