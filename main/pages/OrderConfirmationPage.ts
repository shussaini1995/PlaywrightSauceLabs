import { Page } from '@playwright/test';
import { expect } from '../fixtures/pageFixtures';

export class OrderConfirmationPage{

    page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async validateOrderPlacedSuccessfully(successMsg : string){
        await expect(this.page.locator('.complete-header')).toHaveText(successMsg);
    }
}