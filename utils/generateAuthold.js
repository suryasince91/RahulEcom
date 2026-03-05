const { chromium } = require('playwright');

(async () => {

  // 🔹 Launch browser manually
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.fill('#userEmail', 'surya@surya.com');
  await page.fill('#userPassword', 'Test@123');
  await page.click("input[value='Login']");
  await page.waitForLoadState('networkidle');

  // 🔹 Save storage state
  await context.storageState({ path: 'auth.json' });

  await browser.close();

  console.log("Auth file generated successfully ✅");

})();