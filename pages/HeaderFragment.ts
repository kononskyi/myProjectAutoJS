import { Locator, Page } from "@playwright/test";

export class HeaderFragment {

    page: Page;
    menuTitle: Locator;
    signIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuTitle = page.locator('#menu');
        this.signIn = page.getByTestId('nav-sign-in');
    }

}