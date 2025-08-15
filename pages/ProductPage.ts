import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./fragments/HeaderFragment";
import { BasicPage } from "./BasicPage";

export class ProductPage extends BasicPage {
    
    productTitle: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoriteButton: Locator;
    productAddedAlert: Locator;
    headerFragment: HeaderFragment;

    constructor(page: Page) {
        super(page);
        this.headerFragment = new HeaderFragment(page);
        this.productTitle = page.getByTestId('product-name');
        this.productPrice = page.getByLabel('unit-price');
        this.addToCartButton = page.locator('#btn-add-to-cart');
        this.addToFavoriteButton = page.locator('#btn-add-to-favorites');
        this.productAddedAlert = page.getByRole('alert', { name: 'Product added to shopping cart.' });

    }

    async getProductPrice(): Promise<string> {
        return this.productPrice.innerText();
    }

    async addToCartButtonClick(): Promise<void> {
        await this.addToCartButton.click();
    }

}