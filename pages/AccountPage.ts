import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./fragments/HeaderFragment";
import { BasicPage } from "./BasicPage";

export class AccountPage extends BasicPage {
    
    title: Locator;
    headerFragment: HeaderFragment;

    constructor(page: Page) {
        super(page)
        this.title = page.getByTestId('page-title');
        this.headerFragment = new HeaderFragment(page);
    }

}