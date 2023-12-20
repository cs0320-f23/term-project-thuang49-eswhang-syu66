import { test, expect } from '@playwright/test';

// this tests that the expected frontend components show when loading the page
test('test that frontend components show', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await expect(page.getByText('65%Popularity40%')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A playlist for' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'everything' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A Spotify playlist generator' })).toBeVisible();
    await expect(page.getByText('1Select your parameters')).toBeVisible();
    await expect(page.getByText('2Specify music features')).toBeVisible();
    await expect(page.getByText('3Generate your playlist')).toBeVisible();
    await expect(page.getByText('4Save to your library')).toBeVisible();
    await expect(page.getByText('5Listen and enjoy')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Amplify Logo' })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get started' })).toBeVisible();
});