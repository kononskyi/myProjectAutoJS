import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { creditCardValidData } from 'creditCardValidData';
import { PaymentMethod } from '../common-data/paymentsTestData'

test('Verify user can make an order by Credit Card', { tag: '@regression' }, async ({ loggedInAppApi }) => {
    await loggedInAppApi.homePage.open();
    const firstCardName = await loggedInAppApi.homePage.getFirstProductCardName();
    const cardDataFromHomePage = await loggedInAppApi.homePage.getProductCardInfo(firstCardName);
    await loggedInAppApi.homePage.clickOnCardByName(firstCardName);
    await loggedInAppApi.productPage.addToCartButtonClick();
    await expect(loggedInAppApi.productPage.productAddedAlert).toBeHidden({ timeout: 8000 })
    await loggedInAppApi.productPage.headerFragment.cartClick();

    //Cart (1)
    const cardDataFromCheckOutPage = await loggedInAppApi.checkOutPage.getProductItemInfo(firstCardName);
    expect(cardDataFromHomePage.title).toEqual(cardDataFromCheckOutPage.title);
    expect(cardDataFromHomePage.price).toEqual(cardDataFromCheckOutPage.price);
    await loggedInAppApi.checkOutPage.proceedToCheckOutButtonClick();

    //Sign In (2)
    await expect(loggedInAppApi.checkOutPage.alreadyLoggedMessage).toBeVisible();
    await loggedInAppApi.checkOutPage.proceedToCheckOutButtonClick();
    await loggedInAppApi.checkOutPage.fillState('Burgenland');
    await loggedInAppApi.checkOutPage.fillPostCode('1234');
    await loggedInAppApi.checkOutPage.proceedToCheckOutButtonClick();

    //Billing Address (3)
    await loggedInAppApi.checkOutPage.selectPaymentMethod(PaymentMethod.CREDIT_CARD);
    await loggedInAppApi.checkOutPage.fillCreditCardDataAndContinue(
        creditCardValidData.creditCardNumber, creditCardValidData.creditCardExpirationDate,
        creditCardValidData.creditCardCvv, creditCardValidData.creditCardHolderName);
    await expect(loggedInAppApi.checkOutPage.paymentConfirmationMessage).toBeVisible();
    await loggedInAppApi.checkOutPage.confirmButtonClick();

    //Payment (4)
    const orderNumber = await loggedInAppApi.checkOutPage.getOrderConfirmationNumber();

    await loggedInAppApi.invoicesPage.open();
    expect(await loggedInAppApi.invoicesPage.getInvoicesNumbers()).toContain(orderNumber);
    await loggedInAppApi.checkOutPage.open();
    await expect(loggedInAppApi.checkOutPage.getProductItems).toHaveCount(0);

});

