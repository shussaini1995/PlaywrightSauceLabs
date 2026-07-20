import {Locator, Page, expect} from '@playwright/test';

export class CheckoutSummaryPage{

    private page : Page;
    private subTotal : Locator;
    private tax : Locator;
    private total : Locator;
    private finishButton : Locator;
    private cancelButtonLastPage : Locator;

    constructor(page : Page){
        this.page = page;
        this.subTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.cancelButtonLastPage = page.locator('#cancel');
    }
    
    async verifyAddedProductInCheckoutPage(productName : string ){
        await expect (this.page.locator("//div[@class='cart_item' and contains(normalize-space(),'" + productName + "')]"), 'Element is not Visible').toBeVisible();
    }

    async fetchDeliveryDetails(label : string): Promise<string>{
        return await this.page.locator('.summary_info_label')
                       .filter({hasText: label})
                       .locator('+ .summary_value_label').textContent() ?? "";

    }

    async fetchSubTotal() : Promise<string>{
        return await this.subTotal.textContent() ?? "";
    }

    async fetchTax() : Promise<string>{
        return await this.tax.textContent() ?? "";
    }

    async fetchTotal() : Promise<string>{
        return await this.total.textContent() ?? "";
    }

    async finish(){
        await this.finishButton.click();
        await this.page.waitForTimeout(3000);
    }

    async cancelLastPage(){
        this.cancelButtonLastPage.click();
    }

}