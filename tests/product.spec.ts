import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.clickOnCardByName('Combination Pliers');
    expect(page.url()).toContain('/product');
    await expect(productPage.productTitle).toContainText('Combination Pliers');
    await expect(productPage.productPrice).toContainText('14.15');
    expect(await productPage.getProductPrice()).toBe('14.15'); // another solution to check price
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoriteButton).toBeVisible();
});
