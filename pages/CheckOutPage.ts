import { Locator, Page } from "@playwright/test";
import { BasicPage } from "./BasicPage";
export class CheckOutPage extends BasicPage {

    readonly proceedToCheckOutButton: Locator;
    readonly productsTitle: Locator;
    readonly productItems: Locator;
    readonly totalPrice: Locator;
    readonly alreadyLoggedMessage: Locator;
    readonly stateFiled: Locator;
    readonly postCodeField: Locator;
    readonly paymentMethodDropdown: Locator;
    readonly creditCardNumberField: Locator;
    readonly creditCardExpirationDateField: Locator;
    readonly creditCardCvvField: Locator;
    readonly creditCardCardHolderNameField: Locator;
    readonly confirmButton: Locator;
    readonly paymentConfirmationMessage: Locator;
    readonly confirmationOrderNumber: Locator;
    readonly emptyCheckOutCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckOutButton = page.getByRole('button', { name: 'Proceed to checkout', exact: true });
        this.productsTitle = page.getByTestId('product-title');
        this.productItems = page.locator('tbody>tr');
        this.totalPrice = page.getByTestId('cart-total');
        this.alreadyLoggedMessage = page.locator('aw-wizard-step>app-login p');
        this.stateFiled = page.getByTestId('state');
        this.postCodeField = page.getByTestId('postal_code');
        this.paymentMethodDropdown = page.locator('#payment-method');
        this.creditCardNumberField = page.locator('input#credit_card_number');
        this.creditCardExpirationDateField = page.getByTestId('expiration_date');
        this.creditCardCvvField = page.getByTestId('cvv');
        this.creditCardCardHolderNameField = page.getByTestId('card_holder_name');
        this.confirmButton = page.getByTestId('finish');
        this.paymentConfirmationMessage = page.getByTestId('payment-success-message');
        this.confirmationOrderNumber = page.locator('#order-confirmation>span');
        this.emptyCheckOutCartMessage = page.locator('app-cart>p');
    }

    async getProductQuantityByName(productName: string): Promise<string> {
        return this.page.getByText(`Quantity for ${productName}`).locator('+input').inputValue();
    }

    async open(): Promise<void> {
        await this.page.goto('/checkout', { waitUntil: 'load' });
    }

    async getProductItemNames(): Promise<Array<string>> {
        return this.productItems.getByTestId('product-title').allInnerTexts();
    }

    async getProductItemsCount(): Promise<number> {
        return this.productItems.getByTestId('product-title').count();
    }
    private getProductItemByName(name: string): Locator {
        return this.productItems.filter({ hasText: `${name}` });
    }

    async getProductItemInfo(name: string): Promise<CheckOutItemInfo> {
        const productItemFromCart = this.getProductItemByName(name);
        const productTitle = await productItemFromCart.getByTestId('product-title').innerText();
        const productPrice = await productItemFromCart.getByTestId('product-price').innerText();
        const productQuantity = await productItemFromCart.getByTestId('product-quantity').inputValue();
        const productTotal = await productItemFromCart.getByTestId('line-price').innerText();
        return {
            title: productTitle.trim(),
            price: productPrice.replace('$', ''),
            quantity: productQuantity,
            total: productTotal.replace('$', '')
        }
    }

    async proceedToCheckOutButtonClick(): Promise<void> {
        await this.proceedToCheckOutButton.focus();
        await this.proceedToCheckOutButton.click();
    }

    async fillState(state: string): Promise<void> {
        await this.stateFiled.focus();
        await this.stateFiled.fill(state);
    }

    async fillPostCode(postCode: string): Promise<void> {
        await this.postCodeField.focus();
        await this.postCodeField.fill(postCode);
    }

    async selectPaymentMethod(paymentMethodName: string): Promise<void> {
        await this.paymentMethodDropdown.selectOption(paymentMethodName);
    }

    async fillCreditCardDataAndContinue(creditCardNumber: string, expirationDate: string, cvvCode: string, cardHolderName: string): Promise<void> {
        await this.creditCardNumberField.fill(creditCardNumber);
        await this.creditCardExpirationDateField.fill(expirationDate);
        await this.creditCardCvvField.fill(cvvCode);
        await this.creditCardCardHolderNameField.fill(cardHolderName);
        await this.postCodeField.focus();
        await this.confirmButton.click();
    }

    async confirmButtonClick(): Promise<void> {
        await this.postCodeField.focus();
        await this.confirmButton.click();
        await this.page.waitForResponse(/practicesoftwaretesting.com\/invoices/);
    }

    async getOrderConfirmationNumber(): Promise<string> {
        return this.confirmationOrderNumber.innerText();
    }

}

interface CheckOutItemInfo {
    title: string,
    price: string,
    quantity: string,
    total: string
}

export enum PaymentMethod {
    BANK_TRANSFER = 'Bank Transfer',
    CASH_ON_DELIVERY = 'Cash on Delivery',
    CREDIT_CARD = 'Credit Card',
    BUY_NOW_PAY_LATER = 'Buy Now Pay Later',
    GIFT_CARD = 'Gift Card'
}
