import { test as base, expect } from '@playwright/test'
import { authData } from 'authData';
import { AllPages } from 'pages/AllPages'

type Pages = {
    allPages: AllPages;
    loggedInApp: AllPages;
    loggedInAppUI: AllPages;
}

export const test = base.extend<Pages>({

    allPages: async ({ page }, use) => {
        const allPages = new AllPages(page);
        await use(allPages);
    },

    //----------Login by UI--------
    loggedInAppUI: async ({ allPages }, use) => {
        await allPages.loginPage.open();
        await allPages.loginPage.login(authData.email, authData.password);
        await expect(allPages.accountPage.title).toContainText('My account');
        await use(allPages);
    },

    //----------Login by cookies-------
    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './playwright/.auth/user.json' });
        const page = await context.newPage();
        const allPages = new AllPages(page);
        await use(allPages);
        await page.close();
        await context.close();
    }
})