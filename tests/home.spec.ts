import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/HomePage';
import { PowerTools, SortOption } from 'pages/fragments/SideFiltersFragment';
import { arraySorting, checkArraysEquality } from 'pages/helpers/arraysUtils';

[
    {
        dropdownSortType: SortOption.BY_NAME_DESC,
        manualSortType: 'desc'
    },
    {
        dropdownSortType: SortOption.BY_NAME_ASC,
        manualSortType: 'asc'
    }
].forEach(({ dropdownSortType, manualSortType }) => {
    test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.sideFiltersFragment.sortProductsByName(dropdownSortType);
        const afterSortingCardsNames = await homePage.getProductCardsNames();
        const afterSortingManual = arraySorting(await homePage.getProductCardsNames(), manualSortType);
        expect(checkArraysEquality(afterSortingCardsNames, afterSortingManual)).toBeTruthy();
    });
});

[
    {
        dropdownSortType: SortOption.BY_PRICE_DESC,
        manualSortType: 'desc'
    },
    {
        dropdownSortType: SortOption.BY_PRICE_ASC,
        manualSortType: 'asc'
    }
].forEach(({ dropdownSortType, manualSortType }) => {
    test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.sideFiltersFragment.sortProductsByName(dropdownSortType);
        const afterSortingCardsPrices = await homePage.getProductCardsPrices();
        const afterSortingManual = arraySorting(await homePage.getProductCardsPrices(), manualSortType);
        expect(checkArraysEquality(afterSortingCardsPrices, afterSortingManual)).toBeTruthy();
    });
});

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.sideFiltersFragment.selectCheckbox(PowerTools.SANDER);
    expect(await homePage.checkProductNames('Sander')).toBeTruthy();
});

