import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    card: Locator;

    constructor(page: Page) {
        this.page = page;
        this.card = page.locator('a.card');
    }

    async clickOnCardByName(name: string) {
        const element = this.card.filter({ hasText: `${name}` });
        await element.click();
    }
    
}