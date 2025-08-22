import { Page } from "@playwright/test";
export abstract class BasicPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get getUrlDirectly(): string {
        return this.page.url();
    }

}
