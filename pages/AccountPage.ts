import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./HeaderFragment";

export class AccountPage {

    page: Page;
    title: Locator;
    headerFragment: HeaderFragment;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('page-title');
        this.headerFragment = new HeaderFragment(page);
    }

}