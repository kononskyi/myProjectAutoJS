import { Locator, Page } from "@playwright/test";
import { BasicPage } from "./BasicPage";

export class InvoicesPage extends BasicPage {

    readonly invoicesNumbersList: Locator;

    constructor(page: Page) {
        super(page);
        this.invoicesNumbersList = page.locator('tbody>tr>td:first-of-type');
    }

    async getInvoicesNumbers(): Promise<Array<string>> {
        return this.invoicesNumbersList.allInnerTexts();
    }

    async open(): Promise<void> {
        await this.page.goto('/account/invoices', { waitUntil: 'load' });
        await this.page.waitForResponse(/practicesoftwaretesting.com\/invoices/);
    }

}