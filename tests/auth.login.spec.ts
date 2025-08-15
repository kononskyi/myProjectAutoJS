import { expect, test } from "@playwright/test";
import { LoginPage } from "pages/LoginPage";
import { authData } from 'authData';
import path from "path";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login test with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(authData.email, authData.password);
  await expect(page).toHaveURL('/account');

  await page.context().storageState({ path: authFile });
});