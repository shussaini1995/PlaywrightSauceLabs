import { test, expect } from '../../main/fixtures/pageFixtures';
import testdata from '../resources/testdata.json';
import * as allure from 'allure-js-commons';
// import '../hooks/hooks';

test.beforeEach("object creation", async({page}) => {
    await allure.owner("Syed Hussaini");
    await allure.severity("critical");
    await allure.feature("E2E Flow");
    await allure.story("Verify product added to Cart and checkout");
})

test("Verify product added to Cart and checkout", async({
    loginPageObj,
    inventoryPageObj,
    cartPageObj,
    checkoutPageObj,
    checkoutSummaryPageObj,
    orderConfirmationPageObj}) => {

    //Url is being read from playwright config file
    await allure.step("Login to the application", async() => {
        await loginPageObj.openUrl('/');
        await loginPageObj.login(testdata.username, testdata.password);
    });

    allure.step("Add product to cart and checkout", async() => {
        await inventoryPageObj.addSpecificProductToCart(testdata.productName);
        await inventoryPageObj.verifySpecificProductHasRemoveButtonVisible(testdata.productName);
        await inventoryPageObj.viewShoppingCart();
    });
    
    await allure.step("Verify product in cart and checkout", async() => {
        await cartPageObj.verifyAddedProductInCartPage(testdata.productName);
        await cartPageObj.checkout();
    });

    await allure.step("Fill checkout details and place order", async() => {
        await checkoutPageObj.fillCheckoutDetails('Syed', 'Hussaini', '123456');
        await checkoutPageObj.continue();
    });
    
    await allure.step("Verify product in checkout summary and place order", async() => {
        await checkoutSummaryPageObj.verifyAddedProductInCheckoutPage(testdata.productName);
        console.log('Payment Information: ' + await checkoutSummaryPageObj.fetchDeliveryDetails('Payment Information:'));
        console.log('Shipping Information: ' + await checkoutSummaryPageObj.fetchDeliveryDetails('Shipping Information:'));
        console.log('Payment Details:\n');
        console.log(await checkoutSummaryPageObj.fetchSubTotal());
        console.log(await checkoutSummaryPageObj.fetchTax());
        console.log(await checkoutSummaryPageObj.fetchTotal());
        await checkoutSummaryPageObj.finish();
        await orderConfirmationPageObj.validateOrderPlacedSuccessfully(testdata.SuccessMsg);
    });

})