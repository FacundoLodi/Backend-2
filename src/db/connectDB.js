import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Facundo:Samudio123@coderhouselodi.eqlcbij.mongodb.net/usuarios?retryWrites=true&w=majority"
    );
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error MongoDB:", error);
  }
};