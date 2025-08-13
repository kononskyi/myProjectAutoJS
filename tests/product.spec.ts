import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CheckOutPage } from "pages/CheckOutPage";

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.clickOnCardByName('Combination Pliers');
    expect(productPage.getUrlDirectly).toContain('/product');
    await expect(productPage.productTitle).toContainText('Combination Pliers');
    await expect(productPage.productPrice).toContainText('14.15');
    expect(await productPage.getProductPrice()).toBe('14.15'); // another solution to check price
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoriteButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkOutPage = new CheckOutPage(page);

    await homePage.open();
    const cardInfo = await homePage.getProductCardInfo('Slip Joint Pliers');

    await homePage.clickOnCardByName('Slip Joint Pliers');
    expect(await productPage.getUrl()).toContain('/product');
    await expect(productPage.productTitle).toContainText(cardInfo.title!);
    await expect(productPage.productPrice).toContainText(cardInfo.price!);

    await productPage.addToCartButtonClick();
    await expect(productPage.productAddedAlert).toBeVisible();
    await expect(productPage.productAddedAlert).toContainText('Product added to shopping cart');
    await productPage.headerFragment.waitForInvisibility(productPage.productAddedAlert, 8000);
    await expect(productPage.headerFragment.cartQuantityBadge).toContainText('1');

    await productPage.headerFragment.cartClick();
    expect(await checkOutPage.getUrl()).toContain('/checkout');
    await expect(checkOutPage.productsTitle).toContainText(cardInfo.title!);
    expect(await checkOutPage.getProductQuantityByName('Slip Joint Pliers')).toBe('1');
    await expect(checkOutPage.proceedToCheckOutButton).toBeVisible();
});