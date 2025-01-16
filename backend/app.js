import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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
import scheduleRoutes from './routes/ScheduleRoutes.js';
import taskRoutes from './routes/TaskRoutes.js';
import reminderRoutes from './routes/ReminderRoutes.js';
import notificationRoutes from './routes/NotificationRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import authMiddleware from './middleware/AuthMiddleware.js';
import {cloudinaryConnection} from './config/cloudinary.js';
import checkoutRoutes from './routes/CheckoutRoutes.js';

dotenv.config();

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Cloudinary config
cloudinaryConnection();

// API Routes
app.use('/api/courses', authMiddleware, courseRoutes);
app.use('/api/modules', authMiddleware, moduleRoutes);
app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/assesments', authMiddleware, assesmentRoutes);
app.use('/api/questions', authMiddleware, questionRoutes);
app.use('/api/answers', authMiddleware, answerRoutes);
app.use('/api/student-answers', authMiddleware, studentAnswerRoutes);
app.use('/api/enrollments', authMiddleware, enrollmentRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/progress', authMiddleware, progressTrackingRoutes);
app.use('/api/content', authMiddleware, contentRoutes);
app.use('/api/schedules', authMiddleware, scheduleRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/reminders', authMiddleware, reminderRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);
app.use('/api/checkout', authMiddleware,checkoutRoutes);
app.use('/api/auth', authRoutes);

export default app;