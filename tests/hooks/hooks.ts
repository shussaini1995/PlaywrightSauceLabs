import { test } from '@playwright/test';
import { AllureUtils } from '../../main/utils/AllureUtils';

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await AllureUtils.attachScreenshot(page, `Failure-${testInfo.title}`);
    }
});