import { expect } from "@playwright/test";
import { test } from "fixtures/myFixtures";

test('Verify user can view product details', async ({ allPages, page }) => {
    const productName = 'Combination Pliers';

    await allPages.homePage.open();
    await allPages.homePage.clickOnCardByName(productName);
    await expect(page).toHaveURL(/\/product/);
    await expect(allPages.productPage.productTitle).toContainText(productName);
    await expect(allPages.productPage.productPrice).toContainText('14.15');
    expect(await allPages.productPage.getProductPrice()).toBe('14.15'); // another solution to check price
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(allPages.productPage.addToFavoriteButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ allPages, page }) => {
    const productName = 'Slip Joint Pliers';

    await allPages.homePage.open();
    const cardInfo = await allPages.homePage.getProductCardInfo(productName);

    await allPages.homePage.clickOnCardByName(productName);
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(page).toHaveURL(/\/product/);
    await expect(allPages.productPage.productTitle).toContainText(cardInfo.title!);
    await expect(allPages.productPage.productPrice).toContainText(cardInfo.price!);

    await allPages.productPage.addToCartButtonClick();
    await expect(allPages.productPage.productAddedAlert).toBeVisible();
    await expect(allPages.productPage.productAddedAlert).toBeHidden({ timeout: 8000 })
    await expect(allPages.productPage.headerFragment.cartQuantityBadge).toContainText('1');

    await allPages.productPage.headerFragment.cartClick();
    await expect(allPages.checkOutPage.proceedToCheckOutButton).toBeVisible();
    await expect(page).toHaveURL(/\/checkout/);
    await expect(allPages.checkOutPage.productsTitle).toContainText(cardInfo.title!);
    expect(await allPages.checkOutPage.getProductQuantityByName(productName)).toBe('1');
    await expect(allPages.checkOutPage.proceedToCheckOutButton).toBeVisible();
});