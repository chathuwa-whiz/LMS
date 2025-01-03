import { addProgressTracking, getProgressTrackingByUser, getProgressTrackingByCourse, updateProgressTracking, deleteProgressTracking } from '../controllers/ProgressTrackingController.js';
import express from 'express';

const progressTrackingRoutes = express.Router();

progressTrackingRoutes.post('/', addProgressTracking);
progressTrackingRoutes.get('/:userId', getProgressTrackingByUser);
progressTrackingRoutes.get('/:userId/:courseId', getProgressTrackingByCourse);
progressTrackingRoutes.put('/', updateProgressTracking);
progressTrackingRoutes.delete('/:userId/:courseId', deleteProgressTracking);

export default progressTrackingRoutes;