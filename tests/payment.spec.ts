import { expect } from '@playwright/test';
import { test } from '../fixtures/myFixtures';
import { creditCardValidData } from 'creditCardValidData';
import { PaymentMethod } from '../pages/CheckOutPage'

test('Verify user can make an order by Credit Card', async ({ loggedInApp }) => {
    await loggedInApp.homePage.open();
    const firstCardName = await loggedInApp.homePage.getFirstProductCardName();
    const cardDataFromHomePage = await loggedInApp.homePage.getProductCardInfo(firstCardName);
    await loggedInApp.homePage.clickOnCardByName(firstCardName);
    await loggedInApp.productPage.addToCartButtonClick();
    await expect(loggedInApp.productPage.productAddedAlert).toBeHidden({ timeout: 8000 })
    await loggedInApp.productPage.headerFragment.cartClick();

    //Cart (1)
    const cardDataFromCheckOutPage = await loggedInApp.checkOutPage.getProductItemInfo(firstCardName);
    expect(cardDataFromHomePage.title).toEqual(cardDataFromCheckOutPage.title);
    expect(cardDataFromHomePage.price).toEqual(cardDataFromCheckOutPage.price);
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();

    //Sign In (2)
    await expect(loggedInApp.checkOutPage.alreadyLoggedMessage).toBeVisible();
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();
    await loggedInApp.checkOutPage.fillState('Burgenland');
    await loggedInApp.checkOutPage.fillPostCode('1234');
    await loggedInApp.checkOutPage.proceedToCheckOutButtonClick();

    //Billing Address (3)
    await loggedInApp.checkOutPage.selectPaymentMethod(PaymentMethod.CREDIT_CARD);
    await loggedInApp.checkOutPage.fillCreditCardDataAndContinue(
        creditCardValidData.creditCardNumber, creditCardValidData.creditCardExpirationDate,
        creditCardValidData.creditCardCvv, creditCardValidData.creditCardHolderName);
    await expect(loggedInApp.checkOutPage.paymentConfirmationMessage).toBeVisible();
    await loggedInApp.checkOutPage.confirmButtonClick();

    //Payment (4)
    const orderNumber = await loggedInApp.checkOutPage.getOrderConfirmationNumber();

    await loggedInApp.invoicesPage.open();
    expect(await loggedInApp.invoicesPage.getInvoicesNumbers()).toContain(orderNumber);
    await loggedInApp.checkOutPage.open();
    expect(await loggedInApp.checkOutPage.getProductItemsCount()).toEqual(0);

});

