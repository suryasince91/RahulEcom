const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { OrdersPage } = require('../pages/OrdersPage');

// ensure storage state from previous registration is used

test.use({ storageState: 'auth.json' });

test('full order flow for iPhone 13', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();
  const home = new HomePage(page);

  // add product and verify cart indicator
  await home.goto();
  // product name on site is lower‑case with "pro" suffix
  const productName = 'iphone 13 pro';
  await home.addProductToCart(productName);
  const cartCount = await home.getCartCount();
  expect(cartCount).toBeGreaterThan(0);

  // checkout
  await home.checkout('India');
  await expect(page.locator('h1')).toContainText('Thankyou for the order.');

  // navigate to orders page and assert the item is present
  await home.goToOrders();
  const ordersPage = new OrdersPage(page);
  const order = await ordersPage.findOrderByName('iphone 13 pro');
  expect(order).toBeTruthy();

  // print details
  console.log('Order details:', order);

  await context.close();
});