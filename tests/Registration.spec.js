const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { RegistrationPage } = require('../pages/RegistrationPage');

// thin spec that delegates to the page object

test('Register New User', async ({ page }) => {
  const reg = new RegistrationPage(page);
  const user = {
    firstName: 'Meena',
    lastName: 'Kumari',
    email: 'meena@test.com',
    phone: '9944479910',
    profession: 'Engineer',
    gender: 'Male',
    password: 'Test@123',
  };

  await reg.navigate();
  await reg.register(user);

  // persist credentials for generateAuth.js
  const filePath = path.join(__dirname, '../utils/userData.json');
  fs.writeFileSync(
    filePath,
    JSON.stringify({ Username: user.email, Password: user.password }, null, 2)
  );
  console.log('User credentials saved successfully ✅');
});