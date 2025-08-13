import { Locator, Page } from "@playwright/test";
import { BasicPage } from "./BasicPage";

export class LoginPage extends BasicPage {

    emailField: Locator;
    passwordField: Locator;
    submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = this.page.locator('#email');
        this.passwordField = this.page.getByPlaceholder('Your password', { exact: true });
        this.submitButton = this.page.locator('.btnSubmit');
    }

    async open(): Promise<void> {
        await this.page.goto('/auth/login', { waitUntil: 'load' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

}