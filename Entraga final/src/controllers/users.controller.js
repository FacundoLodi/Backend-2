import { UsersRepository } from "../repositories/users.repository.js";
import { UsersDAO } from "../dao/mongo/users.dao.js";

const usersRepo = new UsersRepository(new UsersDAO());

export const register = async (req, res) => {
  try {
    const user = await usersRepo.createUser(req.body);

    res.status(201).json({
      mensaje: "Usuario creado",
      usuario: user.email
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ya existe una cuenta con ese correo"
      });
    }

    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updates = { ...req.body };

    if (updates.role && req.user.role !== "admin") {
      return res.status(403).json({ error: "No autorizado para cambiar el rol" });
    }

    const updatedUser = await usersRepo.updateById(uid, updates);

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario actualizado", usuario: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const deletedUser = await usersRepo.deleteById(uid);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};