import { Router } from "express";
import passport from "passport";
import {
  getCart,
  getCurrentCart,
  addProductToCart,
  purchaseCart,
  getMyTickets
} from "../controllers/carts.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/my-tickets",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  getMyTickets
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  getCurrentCart
);

router.get(
  "/:cid",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  getCart
);

router.post(
  "/:cid/product/:pid",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  addProductToCart
);

router.post(
  "/purchase",
  passport.authenticate("current", { session: false }),
  authorize(["user", "admin"]),
  purchaseCart
);

export default router;