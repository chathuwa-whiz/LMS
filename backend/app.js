import express from 'express';
import dotenv from 'dotenv';

import courseRoutes from './routes/CourseRoutes.js';
import moduleRoutes from './routes/ModuleRoutes.js';
import lessonRoutes from './routes/LessonRoutes.js';

import assesmentRoutes from './routes/AssesmentRoutes.js';
import questionRoutes from './routes/AssesmentQuestionRoutes.js';
import responseRoutes from './routes/AssesmentResponseRoutes.js';

dotenv.config();

// Express app
const app = express();

// Middlewares
app.use(express.json());

// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);

app.use('/api/assesments', assesmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);

export default app;