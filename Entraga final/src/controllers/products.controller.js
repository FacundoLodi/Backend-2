import { ProductsRepository } from "../repositories/products.repository.js";
import { ProductsDAO } from "../dao/mongo/products.dao.js";

const productsRepo = new ProductsRepository(new ProductsDAO());

export const getProducts = async (req, res) => {
  const products = await productsRepo.getAll();
  res.json(products);
};

export const createProduct = async (req, res) => {
  const product = await productsRepo.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepo.update(pid, req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  await productsRepo.delete(pid);
  res.json({ mensaje: "Producto eliminado correctamente" });
};