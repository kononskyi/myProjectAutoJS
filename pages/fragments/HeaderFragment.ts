import { Locator, Page } from "@playwright/test";

export class HeaderFragment {

    page: Page;
    menuTitle: Locator;
    signIn: Locator;
    cartQuantityBadge: Locator;
    cart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuTitle = page.locator('#menu');
        this.signIn = page.getByTestId('nav-sign-in');
        this.cartQuantityBadge = page.getByTestId('cart-quantity');
        this.cart = page.locator('[aria-label="cart"]');
    }

    async waitForInvisibility(locator: Locator, timeOut: number): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout: timeOut });
    }

    async cartClick(): Promise<void> {
        await this.cart.click();
    }

}