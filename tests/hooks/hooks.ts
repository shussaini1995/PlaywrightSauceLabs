import { test } from '@playwright/test';
import { AllureUtils } from '../../main/utils/AllureUtils';

test.afterEach(async ({ page }, testInfo) => {
    console.log("executing aftereach method")
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log("attaching screenshot");
        await AllureUtils.attachScreenshot(page, `Failure-${testInfo.title}`);
    }
});