import { CartsRepository } from "../repositories/carts.repository.js";
import { CartsDAO } from "../dao/mongo/carts.dao.js";
import { TicketsRepository } from "../repositories/tickets.repository.js";
import { TicketsDAO } from "../dao/mongo/tickets.dao.js";

const cartsRepo = new CartsRepository(new CartsDAO());
const ticketsRepo = new TicketsRepository(new TicketsDAO());

export const getCart = async (req, res) => {
  try {
    if (req.user.cart.toString() !== req.params.cid) {
      return res.status(403).json({ error: "No autorizado a ver este carrito" });
    }

    const cart = await cartsRepo.getCartById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

export const getCurrentCart = async (req, res) => {
  try {
    if (!req.user.cart) {
      return res.status(404).json({ error: "Usuario sin carrito" });
    }

    const cart = await cartsRepo.getCartById(req.user.cart);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito actual" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsRepo.addProduct(cid, pid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito o producto no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    if (error.message === "SIN_STOCK") {
      return res.status(400).json({ error: "El producto no tiene stock disponible" });
    }

    if (error.message === "STOCK_MAXIMO") {
      return res.status(400).json({ error: "Stock máximo alcanzado para este producto" });
    }

    console.error(error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const cart = await cartsRepo.getCartById(req.user.cart);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let total = 0;
    const rejected = [];

    for (const item of cart.products) {
      if (item.product.stock >= item.quantity) {
        item.product.stock -= item.quantity;
        total += item.product.price * item.quantity;
        await item.product.save();
      } else {
        rejected.push(item.product._id.toString());
      }
    }

    cart.products = cart.products.filter(p =>
      rejected.includes(p.product._id.toString())
    );

    await cartsRepo.saveCart(cart);

    const ticket = await ticketsRepo.createTicket(
      total,
      req.user.email
    );

    res.json({
      mensaje: "Compra procesada",
      ticket,
      productos_no_comprados: rejected
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la compra" });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await ticketsRepo.getTicketsByPurchaser(req.user.email);

    res.json({
      usuario: req.user.email,
      total_compras: tickets.length,
      tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener historial de compras" });
  }
};