export class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCartById(id) {
    return await this.dao.getById(id);
  }

  async createCart() {
    return await this.dao.create();
  }

  async saveCart(cart) {
    return await this.dao.update(cart);
  }

  async addProduct(cartId, productId) {
    return await this.dao.addProduct(cartId, productId);
  }
}