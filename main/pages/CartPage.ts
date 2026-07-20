import {Locator, Page, expect} from '@playwright/test';

export class CartPage{

    private page : Page;
    private checkoutButton : Locator;
    private continueShoppingButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async checkout(){
        await this.checkoutButton.click();
        await this.page.waitForTimeout(3000);
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
        await this.page.waitForTimeout(3000);
    }

    async verifyAddedProductInCartPage(productName : string ){
        await expect (this.page.locator("//div[@class='cart_item' and contains(normalize-space(),'" + productName + "')]"), 'Element is not Visible').toBeVisible();
    }

}