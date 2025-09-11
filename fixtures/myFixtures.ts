import { test as base, expect } from '@playwright/test';
import { BASE_API_URL, USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import { AllPages } from 'pages/AllPages';

type Pages = {
    allPages: AllPages;
    loggedInApp: AllPages;
    loggedInAppUI: AllPages;
    loggedInAppApi: AllPages;
}

export const test = base.extend<Pages>({

    allPages: async ({ page }, use) => {
        const allPages = new AllPages(page);
        await use(allPages);
    },

    //----------Login by UI--------
    loggedInAppUI: async ({ allPages }, use) => {
        await allPages.loginPage.open();
        await allPages.loginPage.login(USER_EMAIL, USER_PASSWORD);
        await expect(allPages.accountPage.title).toContainText('My account');
        await use(allPages);
    },

    //----------Login By API -------
    loggedInAppApi: async ({ request, allPages, page }, use) => {
        const apiUrl = BASE_API_URL;
        const response = await request.post(`${apiUrl}/users/login`, {
            data: {
                email: USER_EMAIL,
                password: USER_PASSWORD
            }
        });
        const jsonData = await response.json() as LoginResponse;
        const token = jsonData.access_token;
        await page.goto('');
        await page.evaluate((token) => {
            localStorage.setItem('auth-token', token);
        }, token);
        await use(allPages);
    },

    //----------Login by cookies-------
    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './playwright/.auth/user.json' });
        const page = await context.newPage();
        const allPages = new AllPages(page);
        await use(allPages);
        await context.close();
    }
})

interface LoginResponse {
    access_token: string
}