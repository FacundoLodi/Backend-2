import { UserModel } from "../../models/user.model.js";

export class UsersDAO {
  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async create(user) {
    return await UserModel.create(user);
  }

  async updatePassword(email, newPassword) {
    return await UserModel.updateOne(
      { email },
      { $set: { password: newPassword } }
    );
  }

  async updateById(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}