import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
  await page.getByRole('link', { name: 'Category 2' }).click();
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Adam Miller');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('adam@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('adam');
  await page.getByText('Check me out if you Love').click();
  await page.locator('div').filter({ hasText: 'Student' }).nth(4).click();
  await page.locator('input[name="bday"]').fill('2025-12-30');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
});