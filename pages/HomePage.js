class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cardBody = page.locator('.card-body');
    this.cartLink = page.locator('li:has-text("Cart")');
    this.cartCountLabel = page.locator('li:has-text("Cart") label');
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    this.countryInput = page.locator("input[placeholder='Select Country']");
    this.confirmBtn = page.locator('.btnn');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async addProductToCart(name) {
    await this.cardBody
      .filter({ hasText: name })
      .getByRole('button', { name: 'Add To Cart' })
      .click();
    await this.cartLink.click();
  }

  async getCartCount() {
    // Use textContent from the anchor element so that even orphaned text nodes
    // (e.g. the number outside of a <label>) are captured.
    const handle = await this.cartLink.elementHandle();
    if (!handle) return 0;
    const text = await handle.evaluate((el) => el.textContent);
    const match = text && text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async checkout(countryHint = 'ind') {
    await this.checkoutBtn.click();
    await this.countryInput.pressSequentially(countryHint);
    // pick the first matching country after typing; uses regex for flexibility
    await this.page
      .getByRole('button', { name: new RegExp(countryHint, 'i') })
      .first()
      .click();
    await this.confirmBtn.click();
  }

  async goToOrders() {
    await this.page.click('text=Orders');
  }
}

module.exports = { HomePage };