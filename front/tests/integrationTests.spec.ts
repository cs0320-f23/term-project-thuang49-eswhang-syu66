import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('button', { name: 'Get started' }).click();
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('amplify.music.team@gmail.com');
  await page.getByTestId('login-username').press('Tab');
  await page.getByTestId('login-password').fill('dropouts');
  await page.getByTestId('login-button').click();
  await page.getByRole('button', { name: 'Danceability' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Genres' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Search for genres...').click();
  await page.getByPlaceholder('Search for genres...').fill('k-');
  await page.locator('#genresk-pop').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: '→' }).click();
  await expect(page.getByLabel('recommended-track-container')).toBeVisible();
  await page.getByRole('link', { name: 'Amplify' }).click();
});