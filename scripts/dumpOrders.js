const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'auth.json' });
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.click('text=Orders');
  await page.waitForTimeout(2000);
  console.log('---PAGE CONTENT START (first 10000 chars) ---');
  const html = await page.content();
  console.log(html.substring(0, 10000));
  console.log('---PAGE CONTENT END---');
  const fs = require('fs');
  fs.writeFileSync('ordersPage.html', html);
  console.log('ordersPage.html saved');
  await browser.close();
})();