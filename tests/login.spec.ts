import { test, expect } from '@playwright/test';

test('Login test with valid credentials', async ({ page }) => {
  const email: string = 'customer@practicesoftwaretesting.com';
  const password: string = 'welcome01';

  await page.goto('/auth/login', { waitUntil: 'load' });
  await page.locator('#email').fill(email);
  await page.getByPlaceholder('Your password', { exact: true }).fill(password);
  await page.locator('.btnSubmit').click();

  const loggedPageTitleText: string = await page.getByTestId('page-title').innerText();
  const userNameNavigationMenuText: string = await page.locator('#menu').innerText();

  await expect(page).toHaveURL('/account');
  expect(loggedPageTitleText).toEqual('My account');
  expect(userNameNavigationMenuText).toContain('Jane Doe');

});

