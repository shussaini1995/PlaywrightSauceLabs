import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../main/pages/InventoryPage';
import { LoginPage } from '../../main/pages/LoginPage';
import { CartPage } from '../../main/pages/CartPage';
import { CheckOutPage } from '../../main/pages/CheckoutPage';
import { CheckoutSummaryPage} from '../../main/pages/CheckoutSummaryPage';
import { OrderConfirmationPage} from '../../main/pages/OrderConfirmationPage';
import testdata from '../resources/testdata.json';

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
})

test("Verify product added to Cart and checkout", async({page}) => {

    //Url is being read from playwright config file
    await loginPageObj.openUrl('/');
    await loginPageObj.login(testdata.username, testdata.password);

    //Add product to cart
    await inventoryPageObj.addSpecificProductToCart(testdata.productName);
    await inventoryPageObj.verifySpecificProductHasRemoveButtonVisible(testdata.productName);
    await inventoryPageObj.viewShoppingCart();

    //Verify aded product and checkout
    await cartPageObj.verifyAddedProductInCartPage(testdata.productName);
    await cartPageObj.checkout();

    //Enter details and click continue
    await checkoutPageObj.fillCheckoutDetails('Syed', 'Hussaini', '123456');
    await checkoutPageObj.continue();

    //Verify the product/delivery details and place order
    await checkoutSummaryPageObj.verifyAddedProductInCheckoutPage(testdata.productName);
    console.log('Payment Information: ' + await checkoutSummaryPageObj.fetchDeliveryDetails('Payment Information:'));
    console.log('Shipping Information: ' + await checkoutSummaryPageObj.fetchDeliveryDetails('Shipping Information:'));
    console.log('Payment Details:\n');
    console.log(await checkoutSummaryPageObj.fetchSubTotal());
    console.log(await checkoutSummaryPageObj.fetchTax());
    console.log(await checkoutSummaryPageObj.fetchTotal());
    await checkoutSummaryPageObj.finish();
    await orderConfirmationPageObj.validateOrderPlacedSuccessfully(testdata.SuccessMsg);

})