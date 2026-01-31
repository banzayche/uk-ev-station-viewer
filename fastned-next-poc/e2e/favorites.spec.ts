import { test, expect } from '@playwright/test';

test('favorite a station and see it in favorites', async ({ page }) => {
  await page.goto('/stations');
  await page.getByTestId('station-link-uk-manchester-trafford').click();
  await page.getByTestId('favorite-toggle').click();
  await page.goto('/favorites');
  await expect(page.getByText('Trafford Centre')).toBeVisible();
});
