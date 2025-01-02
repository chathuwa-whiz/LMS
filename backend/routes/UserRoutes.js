import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.js';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;