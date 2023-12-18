import { test, expect } from "@playwright/test";

test("auth login fails", async ({
    page,
    }) => {
        await page.goto("http://localhost:3000/auth");
        await page.goto('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dplaylist-modify-private%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ffetch_auth%26state%3D0.24076138699497607%26client_id%3D611754e9a5f14adfabdde1d55224815e');
        await page.getByTestId('login-username').click();
        await page.getByTestId('login-username').fill('amplify.music.team@gmail.com');
        await page.getByTestId('login-username').press('Tab');
        await page.getByTestId('login-password').fill('Ldropouts');
        await page.getByTestId('login-button').click();
        await expect(page.getByText('Incorrect username or')).toBeVisible();
    });

test("auth successfully redirects", async ({
      page,
    }) => {
        await page.goto("http://localhost:3000/auth");
        await page.goto('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dplaylist-modify-private%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ffetch_auth%26state%3D0.44344600750030283%26client_id%3D611754e9a5f14adfabdde1d55224815e');
        await page.getByTestId('login-username').click();
        await page.getByTestId('login-username').fill('amplify.music.team@gmail.com');
        await page.getByTestId('login-username').press('Tab');
        await page.getByTestId('login-password').fill('dropouts');
        await page.getByTestId('login-button').click();
        await expect(page.locator('div').nth(1)).toBeVisible();
        await expect(page.getByText('AcousticnessDanceabilityEnergyInstrumentalnessLivenessLoudnessPopularityTempoVal')).toBeVisible();
        await expect(page.getByText('AmplifyContinue')).toBeVisible();
    });