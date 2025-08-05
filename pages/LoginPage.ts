import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page: Page;
    emailField: Locator;
    passwordField: Locator;
    submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('#email');
        this.passwordField = this.page.getByPlaceholder('Your password', { exact: true });
        this.submitButton = this.page.locator('.btnSubmit');
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }
    
}