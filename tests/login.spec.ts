import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { AccountPage } from '../pages/AccountPage';
import { USER_EMAIL, USER_NAME, USER_PASSWORD } from 'config/baseConfig';

test('Login test with valid credentials using fixtures', { tag: ['@smoke', '@regression'] }, async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Test is skipped on CI due to the Cloudflare protection.');
  await allPages.loginPage.open();
  await allPages.loginPage.login(USER_EMAIL, USER_PASSWORD);
  await expect(allPages.accountPage.title).toContainText('My account');
  await expect(page).toHaveURL('/account');
  await expect(allPages.accountPage.headerFragment.menuTitle).toContainText(USER_NAME);
});

test.describe('Login tests using storage file', { tag: '@smoke' }, () => {
  test.skip(!!process.env.CI, 'Test is skipped on CI due to the Cloudflare protection.');
  test.use({ storageState: './playwright/.auth/user.json' });
  test('Login test with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await page.goto('/account');
    await expect(accountPage.title).toContainText('My account');
    await expect(accountPage.headerFragment.menuTitle).toContainText('Jane Doe');
  });

});