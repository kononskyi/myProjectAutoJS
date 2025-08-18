import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { authData } from 'authData';

test('Login test with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.open();
  await loginPage.login(authData.email, authData.password);

  await expect(page).toHaveURL('/account');
  await expect(accountPage.title).toContainText('My account');
  await expect(accountPage.headerFragment.menuTitle).toContainText(authData.name);
});

test.describe('Login tests using storage file', () => {
  test.use({ storageState: './playwright/.auth/user.json' });
  test('Login test with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await page.goto('/account');
    await expect(accountPage.title).toContainText('My account');
    await expect(accountPage.headerFragment.menuTitle).toContainText('Jane Doe');
  });

});