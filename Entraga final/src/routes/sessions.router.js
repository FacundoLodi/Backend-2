import { Router } from "express";
import passport from "passport";
import {
  login,
  current,
  requestPasswordReset,
  resetPassword,
  changePassword
} from "../controllers/sessions.controller.js";

const router = Router();

router.post("/login", login);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  current
);

router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

router.put(
  "/password",
  passport.authenticate("current", { session: false }),
  changePassword
);

export default router;