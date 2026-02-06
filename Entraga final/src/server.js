import app from "./app.js";
import { connectDB } from "./db/connectDB.js";
import { config } from "./config/config.js";

await connectDB();

app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});