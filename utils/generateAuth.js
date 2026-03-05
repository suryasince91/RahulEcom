const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { LoginPage } = require('../pages/LoginPage');

(async () => {
  const filePath = path.join(__dirname, 'userData.json');
  const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client');
  const login = new LoginPage(page);
  await login.login(userData.Username, userData.Password);

  await context.storageState({ path: 'auth.json' });
  await browser.close();
  console.log('Auth file generated successfully ✅');
})();