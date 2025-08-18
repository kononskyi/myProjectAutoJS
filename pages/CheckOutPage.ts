import { Locator, Page } from "@playwright/test";
import { BasicPage } from "./BasicPage";

export class CheckOutPage extends BasicPage {
    
    readonly proceedToCheckOutButton: Locator;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckOutButton = page.getByTestId('proceed-1');
        this.productsTitle = page.getByTestId('product-title');
    }

    async getProductQuantityByName(productName: string): Promise<string> {
        return this.page.getByText(`Quantity for ${productName}`).locator('+input').inputValue();
    }
}
