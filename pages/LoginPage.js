class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.email = page.fill.bind(page, '#userEmail');
    this.password = page.fill.bind(page, '#userPassword');
    this.loginBtn = page.click.bind(page, "input[value='Login']");
  }

  async login(email, password) {
    await this.page.fill('#userEmail', email);
    await this.page.fill('#userPassword', password);
    await this.page.click("input[value='Login']");
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };