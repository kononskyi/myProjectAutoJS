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

test("Mock GET /products response and check products count", async ({ page, allPages }) => {
    const testProduct = {
        data: [] as {
            brand: object,
            category: object,
            description: string,
            id: number,
            name: string,
            price: number,
            product_image: object
        }[]
    }

    for (let i = 0; i < 20; i++) {
        testProduct.data.push(
            {
                brand: {},
                category: {},
                description: `Test description ${i}`,
                id: i,
                name: `Test name ${i}`,
                price: 20.20 + i,
                product_image: {}
            }
        )
    }

    await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
        await route.fulfill({ json: testProduct });
    });

    await allPages.homePage.open();
    await expect(allPages.homePage.card).toHaveCount(20);

});

