import express from "express";
import passport from "passport";

import usersRouter from "./routes/users.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();

// Middlewares basicos //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasaporte //
initializePassport();
app.use(passport.initialize());

// Rutas //
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

// Ruta de prueba //
app.get("/", (req, res) => {
  res.send("Servidor funcionando OK");
});

export default app;