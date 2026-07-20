import {Locator, Page, expect} from '@playwright/test';

export class OrderConfirmationPage{

    page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async validateOrderPlacedSuccessfully(successMsg : string){
        await expect(this.page.locator('.complete-heade')).toHaveText(successMsg);
    }
}