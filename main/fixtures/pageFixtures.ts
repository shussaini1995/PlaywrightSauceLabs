import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../../main/pages/InventoryPage';
import { LoginPage } from '../../main/pages/LoginPage';
import { CartPage } from '../../main/pages/CartPage';
import { CheckOutPage } from '../../main/pages/CheckoutPage';
import { CheckoutSummaryPage } from '../../main/pages/CheckoutSummaryPage';
import { OrderConfirmationPage } from '../../main/pages/OrderConfirmationPage';

interface pageFixtures {
  loginPageObj: LoginPage;
  cartPageObj: CartPage;
  inventoryPageObj: InventoryPage;
  checkoutPageObj: CheckOutPage;
  checkoutSummaryPageObj: CheckoutSummaryPage;
  orderConfirmationPageObj: OrderConfirmationPage;
}

export const test = base.extend<pageFixtures>({
  loginPageObj: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPageObj: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPageObj: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPageObj: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },
  checkoutSummaryPageObj: async ({ page }, use) => {
    await use(new CheckoutSummaryPage(page));
  },
  orderConfirmationPageObj: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
});

export { expect };