import { Locator, Page } from "@playwright/test";

export class ProductPage {

    page: Page;
    productTitle: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoriteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.getByTestId('product-name');
        this.productPrice = page.getByLabel('unit-price');
        this.addToCartButton = page.locator('#btn-add-to-cart');
        this.addToFavoriteButton = page.locator('#btn-add-to-favorites');

    }

    async getProductPrice() {
        return await this.productPrice.innerText();
    }

}