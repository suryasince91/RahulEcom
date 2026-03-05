const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.use({ storageState: 'auth.json' });

// reuse the storage state file via newContext so tests remain parallel-friendly

test('Home Page', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();
  const home = new HomePage(page);

  await home.goto();
  await home.addProductToCart('iphone 13 pro');
  await home.checkout('ind');

  await expect(page.locator('h1')).toContainText('Thankyou for the order.');
  await expect(page.locator('#htmlData')).toContainText(
    'You can see all the Orders in Orders History Page'
  );
  await expect(page.locator('#htmlData')).toContainText('iphone 13 pro');

  await context.close();
});