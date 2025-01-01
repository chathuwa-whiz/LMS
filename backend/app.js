import express from 'express';
import dotenv from 'dotenv';

import courseRoutes from './routes/CourseRoutes.js';
import moduleRoutes from './routes/ModuleRoutes.js';

dotenv.config();

// Express app
const app = express();

// Middlewares
app.use(express.json());

// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);

export default app;