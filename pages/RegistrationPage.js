class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.email = page.getByPlaceholder('email@example.com');
    this.phone = page.getByPlaceholder('enter your number');
    this.profession = page.locator('.custom-select');
    this.gender = (g) => page.locator(`input[value='${g}']`);
    this.password = page.locator('#userPassword');
    this.confirm = page.locator('#confirmPassword');
    this.terms = page.locator("input[type='checkbox']");
    this.submit = page.locator('#login');
  }

  async navigate() {
    await this.page.goto('https://rahulshettyacademy.com/client');
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async register(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.phone.fill(user.phone);
    await this.profession.selectOption({ label: user.profession });
    await this.gender(user.gender).click();
    await this.password.fill(user.password);
    await this.confirm.fill(user.password);
    await this.terms.click();
    await this.submit.click();
  }
}

module.exports = { RegistrationPage };