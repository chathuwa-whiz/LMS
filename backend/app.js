import express from 'express';
import dotenv from 'dotenv';

import courseRoutes from './routes/CourseRoutes.js';
import moduleRoutes from './routes/ModuleRoutes.js';
import lessonRoutes from './routes/LessonRoutes.js';
import assesmentRoutes from './routes/AssesmentRoutes.js';
import questionRoutes from './routes/AssesmentQuestionRoutes.js';
import answerRoutes from './routes/AssesmentAnswerRoutes.js';
import studentAnswerRoutes from './routes/StudentAnswerRoutes.js';
import enrollmentRoutes from './routes/EnrollmentRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';
import progressTrackingRoutes from './routes/ProgressTrackingRoutes.js';
import contentRoutes from './routes/ContentRoutes.js';

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
app.use('/api/answers', answerRoutes);
app.use('/api/student-answers', studentAnswerRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/progress', progressTrackingRoutes);
app.use('/api/content', contentRoutes);

export default app;