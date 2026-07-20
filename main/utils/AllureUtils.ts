import { Page, TestInfo } from "@playwright/test";

export class AllureUtils {
    static async attachScreenshot(page : Page, testInfo : TestInfo, name: string) : Promise<void> {
        const screenshot = await page.screenshot();
        await testInfo.attach(name, 
            { 
                body : screenshot,
                contentType: 'image/png'
            });
    }
}