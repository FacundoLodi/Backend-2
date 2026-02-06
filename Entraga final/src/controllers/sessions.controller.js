import passport from "passport";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { generateToken, generateResetToken } from "../utils/jwt.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UsersDAO } from "../dao/mongo/users.dao.js";
import { isValidPassword, createHash } from "../utils/bcrypt.js";
import { UserDTO } from "../dto/user.dto.js";
import { sendResetEmail } from "../services/mail.service.js";

const usersRepo = new UsersRepository(new UsersDAO());

export const login = (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false
    });

    res.json({ mensaje: "Login exitoso" });
  })(req, res, next);
};

export const current = (req, res) => {
  res.json(new UserDTO(req.user));
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await usersRepo.getByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const token = generateResetToken(email);

    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 1000 * 60 * 60;
    await user.save();

    await sendResetEmail(email, token);

    res.json({ mensaje: "Correo de recuperación enviado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el correo de recuperación" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const { email } = jwt.verify(token, config.jwtSecret);
    const user = await usersRepo.getByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (
      user.resetToken !== token ||
      !user.resetTokenExpires ||
      user.resetTokenExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Token inválido o ya utilizado" });
    }

    if (isValidPassword(user, password)) {
      return res.status(400).json({
        error: "No se puede usar la misma contraseña"
      });
    }

    const hashedPassword = createHash(password);

    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ mensaje: "Contraseña actualizada correctamente" });

  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const user = await usersRepo.getById(req.user._id);

    if (!isValidPassword(user, currentPassword)) {
      return res
        .status(401)
        .json({ error: "Contraseña actual incorrecta" });
    }

    if (isValidPassword(user, newPassword)) {
      return res.status(400).json({
        error: "La nueva contraseña no puede ser igual a la anterior"
      });
    }

    const hashedPassword = createHash(newPassword);
    await usersRepo.updateById(user._id, { password: hashedPassword });

    res.json({ mensaje: "Contraseña cambiada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cambiar contraseña" });
  }
};