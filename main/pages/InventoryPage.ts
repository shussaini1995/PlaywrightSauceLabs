import {Locator, Page} from '@playwright/test';
import {expect} from '../fixtures/pageFixtures';

export class InventoryPage{

    private page : Page;
    private shoppingCartButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.shoppingCartButton = page.locator('.shopping_cart_link');
    }

    async addSpecificProductToCart(productName : string){
        await this.page.locator('.inventory_item')
        .filter({has: this.page.locator("//a[normalize-space()='" + productName + "']")})
        .getByRole('button' , {name : 'Add To Cart'})
        .click();
    }

    async verifySpecificProductHasRemoveButtonVisible(productName : string){
        await expect(this.page.locator('.inventory_item')
        .filter({has: this.page.locator("//a[normalize-space()='" + productName + "']")})
        .getByRole('button' , {name : 'Remove'})).toBeVisible();
    }

    async viewShoppingCart(){
        await this.shoppingCartButton.click();
        await this.page.waitForTimeout(4000);
    }

}