import { Locator, Page } from "@playwright/test";

export class SideFiltersFragment {
    page: Page;
    sortDropdown: Locator;
    filtersCheckboxes: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('.form-select');
        this.filtersCheckboxes = page.locator('.checkbox>label');
    }

    async sortProductsByName(name: string): Promise<void> {
        await this.sortDropdown.selectOption(name);
        await this.page.waitForLoadState('networkidle');
    }

    async selectCheckbox(name: PowerTools): Promise<void> {
        await this.filtersCheckboxes.filter({ hasText: `${name}` }).locator('>input').check();
        await this.page.waitForResponse(/practicesoftwaretesting.com\/products/);
    }
}

export enum PowerTools {
    GRINDER = 'Grinder',
    SANDER = 'Sander',
    SAW = 'Saw',
    DRILL = 'Drill'
}

export enum HandTools {
    HAMMER = 'Hammer',
    HAD_SAW = 'Hand Saw',
    WRENCH = 'Wrench',
    SCREWDRIVER = 'Screwdriver',
    PLIERS = 'Pliers',
    CHISELS = 'Chisels',
    MEASURES = 'Measures'
}

export enum Other {
    TOOL_BELTS = 'Tool Belts',
    STORAGE_SOLUTIONS = 'Storage Solutions',
    WORKBENCH = 'Workbench',
    SAFETY_GEAR = 'Safety Gear',
    FASTENERS = 'Fasteners',
}
