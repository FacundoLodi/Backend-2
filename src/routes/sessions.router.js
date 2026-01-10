import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { user: req.user },
      "coderSecret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  }
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

export default router;