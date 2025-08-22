import { Page } from "@playwright/test";
import { AccountPage } from "./AccountPage";
import { CheckOutPage } from "./CheckOutPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { ProductPage } from "./ProductPage";
import { InvoicesPage } from "./InvoicesPage";

export class AllPages {

    homePage: HomePage;
    loginPage: LoginPage;
    accountPage: AccountPage;
    productPage: ProductPage;
    checkOutPage: CheckOutPage;
    invoicesPage: InvoicesPage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.productPage = new ProductPage(page);
        this.checkOutPage = new CheckOutPage(page);
        this.invoicesPage = new InvoicesPage(page);
    }

}