import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/bcrypt.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const user = await UserModel.create({
    first_name,
    last_name,
    email,
    age,
    password: createHash(password)
  });

  res.json({ status: "success", user });
});

export default router;