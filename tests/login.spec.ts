import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { HeaderFragment } from '../pages/HeaderFragment';

test('Login test with valid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const headerFragment = new HeaderFragment(page);

  await page.goto('/auth/login', { waitUntil: 'load' });
  await loginPage.login('customer@practicesoftwaretesting.com','welcome01');

  await expect(page).toHaveURL('/account');
  await expect(accountPage.title).toContainText('My account');
  await expect(headerFragment.menuTitle).toContainText('Jane Doe');
});

