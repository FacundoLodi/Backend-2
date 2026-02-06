import { CartModel } from "../../models/cart.model.js";
import { ProductModel } from "../../models/product.model.js";

export class CartsDAO {
  async create() {
    return await CartModel.create({ products: [] });
  }

  async getById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async update(cart) {
    return await cart.save();
  }

  async addProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId).populate("products.product");
    if (!cart) return null;

    const product = await ProductModel.findById(productId);
    if (!product) return null;

    if (product.stock === 0) {
      throw new Error("SIN_STOCK");
    }

    const productIndex = cart.products.findIndex(
      p => p.product._id.toString() === productId
    );

    if (productIndex !== -1) {
      const currentQty = cart.products[productIndex].quantity;

      if (currentQty + 1 > product.stock) {
        throw new Error("STOCK_MAXIMO");
      }

      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    await cart.save();
    return cart.populate("products.product");
  }
}