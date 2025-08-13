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
        const element = this.card.filter({ hasText: `${name}` });
        await element.click();
    }

    async open(): Promise<void> {
        await this.page.goto('', { waitUntil: 'load' });
    }

    async getProductCardInfo(cardName: string): Promise<CardInfo> {
        const card = this.card.filter({ hasText: `${cardName}` });
        if (await card.isVisible()) {
            const cardTitle = await card.getByTestId('product-name').innerText();
            const cardPrice = await card.getByTestId('product-price').innerText();
            return {
                price: cardPrice.replace('$', ''),
                title: cardTitle
            };
        }
        return {};
    }

    async getProductCardsNames(): Promise<Array<string>> {
        return this.card.getByTestId('product-name').allInnerTexts();
    }

    async getProductCardsPrices(): Promise<Array<string>> {
        return this.card.getByTestId('product-price').allInnerTexts();
    }

    async checkProductNames(name: string): Promise<boolean> {
        const namesArray = await this.getProductCardsNames();
        for (const element of namesArray) {
            if (!element.includes(name)) {
                return false;
            }
        }
        return true;
    }

}

interface CardInfo {
    price?: string,
    title?: string
}
