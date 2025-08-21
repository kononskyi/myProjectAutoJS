import { Locator, Page } from "@playwright/test";
import { BasicPage } from "./BasicPage";
import { SideFiltersFragment } from "./fragments/SideFiltersFragment";

export class HomePage extends BasicPage {

    card: Locator;
    sortDropdown: Locator;
    sideFiltersFragment: SideFiltersFragment;

    constructor(page: Page) {
        super(page);
        this.sideFiltersFragment = new SideFiltersFragment(page);
        this.card = page.locator('a.card');
        this.sortDropdown = page.locator('.form-select');
    }

    async clickOnCardByName(name: string): Promise<void> {
        const element = this.getProductCardByName(name);
        await element.click();
    }

    async open(): Promise<void> {
        await this.page.goto('', { waitUntil: 'load' });
    }

    async getProductCardInfo(cardName: string): Promise<CardInfo> {
        const card = this.getProductCardByName(cardName);
        const cardTitle = await card.getByTestId('product-name').innerText();
        const cardPrice = await card.getByTestId('product-price').innerText();
        return {
            price: cardPrice.replace('$', ''),
            title: cardTitle
        };
    }

    private getProductCardByName(name: string): Locator {
        return this.card.filter({ hasText: `${name}` });
    }

    async getProductCardsNames(): Promise<Array<string>> {
        return this.card.getByTestId('product-name').allInnerTexts();
    }

    async getFirstProductCardName(): Promise<string> {
        return this.card.getByTestId('product-name').first().innerText();
    }

    async getProductCardsPrices(): Promise<Array<string>> {
        return this.card.getByTestId('product-price').allInnerTexts();
    }

    async checkProductNames(name: string): Promise<boolean> {
        const namesArray = await this.getProductCardsNames();
        return namesArray.every(element => element.includes(name));
    }

}

interface CardInfo {
    price?: string,
    title?: string
}
