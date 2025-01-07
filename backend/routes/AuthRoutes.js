import { register, login } from '../controllers/AuthController.js';
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;