import { expect } from '@playwright/test';
import { test } from 'fixtures/myFixtures';
import { SortOption } from '../common-data/sideFiltersFragmentTestData';
import { PowerTools } from 'pages/fragments/SideFiltersFragment';
import { arraySorting } from 'pages/helpers/arraysUtils';

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
    test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ allPages }) => {
        await allPages.homePage.open();
        await allPages.homePage.sideFiltersFragment.sortProductsByName(dropdownSortType);
        const afterSortingCardsNames = await allPages.homePage.getProductCardsNames();
        const afterSortingManual = arraySorting(await allPages.homePage.getProductCardsNames(), manualSortType);
        expect(afterSortingCardsNames).toEqual(afterSortingManual);
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
    test(`Verify user can perform sorting by ${dropdownSortType}`, async ({ allPages }) => {
        await allPages.homePage.open();
        await allPages.homePage.sideFiltersFragment.sortProductsByName(dropdownSortType);
        const afterSortingCardsPrices = await allPages.homePage.getProductCardsPrices();
        const afterSortingManual = arraySorting(await allPages.homePage.getProductCardsPrices(), manualSortType);
        expect(afterSortingCardsPrices).toEqual(afterSortingManual);
    });
});

test('Verify user can filter products by category', async ({ allPages }) => {
    await allPages.homePage.open();
    await allPages.homePage.sideFiltersFragment.selectCheckbox(PowerTools.SANDER);
    expect(await allPages.homePage.checkProductNames('Sander')).toBeTruthy();
});

