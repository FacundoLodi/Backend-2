import { Router } from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorize.middleware.js";
import {
  register,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", register);

router.put(
  "/:uid",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  updateUser
);

router.delete(
  "/:uid",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  deleteUser
);

export default router;