import { TicketModel } from "../../models/ticket.model.js";

export class TicketsDAO {
  async create(ticket) {
    return await TicketModel.create(ticket);
  }

  async getByPurchaser(email) {
    return await TicketModel.find({ purchaser: email }).sort({ purchase_datetime: -1 });
  }
}