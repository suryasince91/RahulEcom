class OrdersPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.rows = page.locator('table tbody tr');
  }

  async getOrders() {
    // wait for at least one row to appear; it's safe even if table is empty
    await this.page.waitForSelector('table tbody tr');
    const orders = [];
    const count = await this.rows.count();
    for (let i = 0; i < count; ++i) {
      const row = this.rows.nth(i);
      const id = await row.locator('th').innerText();
      // td indices: 0=image, 1=name, 2=price, 3=date, 4=view, 5=delete
      const name = await row.locator('td').nth(1).innerText();
      const price = await row.locator('td').nth(2).innerText();
      orders.push({ id: id.trim(), name: name.trim(), price: price.trim() });
    }
    return orders;
  }

  async findOrderByName(productName) {
    const orders = await this.getOrders();
    return orders.find((o) => o.name.toLowerCase() === productName.toLowerCase());
  }
}

module.exports = { OrdersPage };