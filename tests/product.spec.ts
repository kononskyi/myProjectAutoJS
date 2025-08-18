import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CheckOutPage } from "pages/CheckOutPage";

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productName = 'Combination Pliers';

    await homePage.open();
    await homePage.clickOnCardByName(productName);
    await expect(page).toHaveURL(/\/product/);
    await expect(productPage.productTitle).toContainText(productName);
    await expect(productPage.productPrice).toContainText('14.15');
    expect(await productPage.getProductPrice()).toBe('14.15'); // another solution to check price
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoriteButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkOutPage = new CheckOutPage(page);
    const productName = 'Slip Joint Pliers';

    await homePage.open();
    const cardInfo = await homePage.getProductCardInfo(productName);

    await homePage.clickOnCardByName(productName);
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(page).toHaveURL(/\/product/);
    await expect(productPage.productTitle).toContainText(cardInfo.title!);
    await expect(productPage.productPrice).toContainText(cardInfo.price!);

    await productPage.addToCartButtonClick();
    await expect(productPage.productAddedAlert).toBeVisible();
    await expect(productPage.productAddedAlert).toBeHidden({ timeout: 8000 })
    await expect(productPage.headerFragment.cartQuantityBadge).toContainText('1');

    await productPage.headerFragment.cartClick();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(page).toHaveURL(/\/product/);
    await expect(checkOutPage.productsTitle).toContainText(cardInfo.title!);
    expect(await checkOutPage.getProductQuantityByName(productName)).toBe('1');
    await expect(checkOutPage.proceedToCheckOutButton).toBeVisible();
});