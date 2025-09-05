import { expect } from "@playwright/test";
import { USER_EMAIL, USER_PASSWORD } from "config/baseConfig";
import { test } from "fixtures/myFixtures";
import path from "path";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login test with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ allPages, page }) => {
  await allPages.loginPage.open();
  await allPages.loginPage.login(USER_EMAIL, USER_PASSWORD);
  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});