export class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async create(product) {
    return await this.dao.create(product);
  }

  async update(id, data) {
    return await this.dao.update(id, data);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }
}