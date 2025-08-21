import { expect } from "@playwright/test";
import { test } from "fixtures/myFixtures";
import { authData } from 'authData';
import path from "path";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login test with valid credentials', async ({ allPages, page }) => {
  await allPages.loginPage.open();
  await allPages.loginPage.login(authData.email, authData.password);
  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});