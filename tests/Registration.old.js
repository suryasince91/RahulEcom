const {test, expect} = require('@playwright/test');

let storage ;

    const Username = "surya@surya.com";
    const Password = 'Test@123'

test ('Registration Page', async({page})=>{

   

    await page.goto("https://rahulshettyacademy.com/client");

   await page.getByRole('link', { name: 'Register' }).click();
    await page.getByLabel('First Name').fill('Raju');
    await page.getByLabel('Last Name').fill('Suriya');
    await page.getByRole('textbox', { name: 'email@example.com' }).fill(Username);
    await page.getByRole('textbox', { name: 'enter your number' }).fill('9944479911');
    await page.locator(".custom-select").selectOption({ label: 'Engineer' });
    await page.locator("input[value='Male']").click();
    await page.locator('#userPassword').fill(Password);
    await page.locator('#confirmPassword').fill(Password);
    await page.locator("input[type='checkbox']").click();
    await page.locator('#login').click();
    await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible();
    await page.getByRole('button', { name: 'Login' }).click();
});

