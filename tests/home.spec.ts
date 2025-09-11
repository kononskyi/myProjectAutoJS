import { expect } from '@playwright/test';
import { test } from 'fixtures/myFixtures';
import { SortOption } from '../common-data/sideFiltersFragmentTestData';
import { PowerTools } from 'pages/fragments/SideFiltersFragment';
import { arraySorting } from 'pages/helpers/arraysUtils';
import { generateProducts } from 'pages/helpers/productsUtils';
import { BASE_API_URL } from 'config/baseConfig';

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
    test(`Verify user can perform sorting by ${dropdownSortType}`, { tag: '@regression' }, async ({ allPages }) => {
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
    test(`Verify user can perform sorting by ${dropdownSortType}`, { tag: '@regression' }, async ({ allPages }) => {
        await allPages.homePage.open();
        await allPages.homePage.sideFiltersFragment.sortProductsByName(dropdownSortType);
        const afterSortingCardsPrices = await allPages.homePage.getProductCardsPrices();
        const afterSortingManual = arraySorting(await allPages.homePage.getProductCardsPrices(), manualSortType);
        expect(afterSortingCardsPrices).toEqual(afterSortingManual);
    });
});

test('Verify user can filter products by category', { tag: '@regression' }, async ({ allPages }) => {
    await allPages.homePage.open();
    await allPages.homePage.sideFiltersFragment.selectCheckbox(PowerTools.SANDER);
    expect(await allPages.homePage.checkProductNames('Sander')).toBeTruthy();
});

test("Mock GET /products response and check products count", { tag: '@regression' }, async ({ page, allPages }) => {
    const productsArray = generateProducts(20);
    const apiUrl = BASE_API_URL;
    await page.route(`${apiUrl}/products*`, async route => {
        await route.fulfill({ json: productsArray });
    });

    await allPages.homePage.open();
    await expect(allPages.homePage.card).toHaveCount(20);

});

