import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

const PORT = 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});