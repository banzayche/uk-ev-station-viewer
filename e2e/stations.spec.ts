import { test, expect } from '@playwright/test';

test('search stations by city', async ({ page }) => {
  await page.goto('/stations');
  await page.getByLabel('Search stations').fill('Manchester');
  await expect(page.getByText('Trafford Centre')).toBeVisible();
});
