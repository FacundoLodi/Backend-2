import { createHash } from "../utils/bcrypt.js";
import { CartsRepository } from "./carts.repository.js";
import { CartsDAO } from "../dao/mongo/carts.dao.js";

const cartsRepo = new CartsRepository(new CartsDAO());

export class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async createUser(user) {
    const exists = await this.dao.getByEmail(user.email);
    if (exists) {
      const error = new Error("Email duplicado");
      error.code = 11000;
      throw error;
    }

    user.password = createHash(user.password);

    const newCart = await cartsRepo.createCart();
    user.cart = newCart._id;

    return await this.dao.create(user);
  }

  async resetPassword(email, newPassword) {
    const hashed = createHash(newPassword);
    return await this.dao.updatePassword(email, hashed);
  }

  async updateById(id, data) {
    return await this.dao.updateById(id, data);
  }

  async deleteById(id) {
    return await this.dao.deleteById(id);
  }
}