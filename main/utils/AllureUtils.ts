import * as allure from "allure-js-commons";
import { Page } from "@playwright/test";

export class AllureUtils {
    static async attachScreenshot(page : Page, name: string) : Promise<void> {
        const screenshot = await page.screenshot();
        await allure.attachment(name, screenshot, 'image/png');
    }
}