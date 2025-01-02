import { createEnrollment, getEnrollmentsByCourseId, getEnrollmentsByUserId, updateEnrollment, deleteEnrollment } from "../controllers/EntrollmentController.js";
import express from 'express';

const enrollmentRoutes = express.Router();

enrollmentRoutes.post('/', createEnrollment);
enrollmentRoutes.get('/user/:userId', getEnrollmentsByUserId);
enrollmentRoutes.get('/course/:courseId', getEnrollmentsByCourseId);
enrollmentRoutes.put('/:id', updateEnrollment);
enrollmentRoutes.delete('/:id', deleteEnrollment);

export default enrollmentRoutes;