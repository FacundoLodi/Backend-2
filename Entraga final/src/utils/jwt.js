import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = user =>
  jwt.sign(
    {
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        cart: user.cart
      }
    },
    config.jwtSecret,
    { expiresIn: "1h" }
  );

export const generateResetToken = email =>
  jwt.sign({ email }, config.jwtSecret, { expiresIn: "1h" });