import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private page : Page;
    private username : Locator;
    private password : Locator;
    private loginButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.getByRole("button", {name : 'Login'});
    }

    async openUrl(url : string){
        await this.page.goto(url);
    }

    async login(username : string, password : string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(3000);
    }

}