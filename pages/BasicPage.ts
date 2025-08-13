import { Page } from "@playwright/test";

export abstract class BasicPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get getUrlDirectly(): string {
        return this.page.url();
    }

    async getUrl(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.page.url());
            }, 1000)
        })
    }

    arraySorting(array: Array<string>, method: string) {

        if (method === 'desc') {
            const sorted = array.sort((a, b) => {
                return a.toLowerCase() < b.toLowerCase() ? 1 : -1;
            });
            return sorted;
        }
        if (method === 'asc') {
            const sorted = array.sort((a, b) => {
                return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
            });
            return sorted;
        }
    }

    checkArraysEquality(array1: Array<string>, array2: Array<string>): boolean {
        if (array1.length !== array2.length) {
            return false;
        } else
            return array1.every((value, index) => value === array2[index]);
    }

}
