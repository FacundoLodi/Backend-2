import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
});

export const ProductModel = mongoose.model("products", productSchema);