import { randomUUID } from "crypto";

export class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTicket(amount, purchaser) {
    return await this.dao.create({
      code: randomUUID(),
      amount,
      purchaser
    });
  }

  async getTicketsByPurchaser(email) {
    return await this.dao.getByPurchaser(email);
  }
}