import { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson } from '../controllers/LessonController.js';
import express from 'express';

const lessonRoutes = express.Router();

lessonRoutes.post('/', createLesson);
lessonRoutes.get('/', getAllLessons);
lessonRoutes.get('/:id', getLessonById);
lessonRoutes.put('/:id', updateLesson);
lessonRoutes.delete('/:id', deleteLesson);

export default lessonRoutes;