import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";
import passport from "passport";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  createProduct
);

router.put(
  "/:pid",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  updateProduct
);

router.delete(
  "/:pid",
  passport.authenticate("current", { session: false }),
  authorize(["admin"]),
  deleteProduct
);

export default router;