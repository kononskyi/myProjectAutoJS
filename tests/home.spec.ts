import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/HomePage';
import { PowerTools } from 'pages/fragments/SideFiltersFragment';

test('Verify user can perform sorting by name (asc & desc)', async ({ page }) => {
    const homePage = new HomePage(page);

    const data = [
        {
            dropdownSortType: 'name,desc',
            manualSortType: 'desc'
        },
        {
            dropdownSortType: 'name,asc',
            manualSortType: 'asc'
        }
    ];

    for (const element of data) {
        await homePage.open();
        await homePage.sideFiltersFragment.sortProductsByName(element.dropdownSortType);
        const afterSortingCardsNames = await homePage.getProductCardsNames();
        const afterSortingManual = homePage.arraySorting(await homePage.getProductCardsNames(), element.manualSortType);
        expect(homePage.checkArraysEquality(afterSortingCardsNames, afterSortingManual!)).toBeTruthy();
    }
});

test('Verify user can perform sorting by price (asc & desc)', async ({ page }) => {
    const homePage = new HomePage(page);

    const data = [
        {
            dropdownSortType: 'price,desc',
            manualSortType: 'desc'
        },
        {
            dropdownSortType: 'price,asc',
            manualSortType: 'asc'
        }
    ];

    for (const element of data) {
        await homePage.open();
        await homePage.sideFiltersFragment.sortProductsByName(element.dropdownSortType);
        const afterSortingCardsPrices = await homePage.getProductCardsPrices();
        const afterSortingManual = homePage.arraySorting(await homePage.getProductCardsPrices(), element.manualSortType);
        expect(homePage.checkArraysEquality(afterSortingCardsPrices, afterSortingManual!)).toBeTruthy();
    }
});

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.sideFiltersFragment.selectCheckbox(PowerTools.SANDER);
    expect(await homePage.checkProductNames('Sander')).toBeTruthy();
});

