import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts"
  },

  resetToken: {
    type: String
  },
  resetTokenExpires: {
    type: Date
  }
});

export const UserModel = mongoose.model("users", userSchema);