import {Locator, Page, expect} from '@playwright/test';

export class CheckOutPage{

    private page : Page;
    private firstName : Locator;
    private lastName : Locator;
    private zipCode : Locator;
    private continueButton : Locator;
    private cancelButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
    }

    async fillCheckoutDetails(firstName : string, lastName : string, zipCode : string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
    }

    async continue(){
        await this.continueButton.click();
        await this.page.waitForTimeout(3000);
    }

    async cancel(){
        await this.cancelButton.click();
    }

}