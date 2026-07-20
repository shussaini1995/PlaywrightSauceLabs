import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../main/pages/InventoryPage';
import { LoginPage } from '../../main/pages/LoginPage';
import { CartPage } from '../../main/pages/CartPage';
import { CheckOutPage } from '../../main/pages/CheckoutPage';
import { CheckoutSummaryPage} from '../../main/pages/CheckoutSummaryPage';
import { OrderConfirmationPage} from '../../main/pages/OrderConfirmationPage';
import testdata from '../resources/testdata.json';
import * as allure from 'allure-js-commons';
//import '../hooks/hooks';

let loginPageObj : LoginPage;
let inventoryPageObj : InventoryPage;
let cartPageObj : CartPage;
let checkoutPageObj : CheckOutPage;
let checkoutSummaryPageObj : CheckoutSummaryPage;
let orderConfirmationPageObj : OrderConfirmationPage

test.beforeEach("object creation", async({page}) => {
    loginPageObj = new LoginPage(page);
    inventoryPageObj = new InventoryPage(page);
    cartPageObj = new CartPage(page);
    checkoutPageObj = new CheckOutPage(page);
    checkoutSummaryPageObj = new CheckoutSummaryPage(page);
    orderConfirmationPageObj = new OrderConfirmationPage(page);
    await allure.owner("Syed Hussaini");
    await allure.severity("critical");
    await allure.feature("E2E Flow");
    await allure.story("Verify product added to Cart and checkout");
})

test("Verify product added to Cart and checkout", async({page}) => {

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