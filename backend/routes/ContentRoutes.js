import { createContent, getAllContent, getContentByCourseId, getContentById, getContentByLessonId, getContentByModuleId, updateContent, deleteContent } from '../controllers/ContentController.js';
import express from 'express';

const contentRoutes = express.Router();

contentRoutes.post('/', createContent);
contentRoutes.get('/', getAllContent);
contentRoutes.get('/:id', getContentById);
contentRoutes.get('/course/:id', getContentByCourseId);
contentRoutes.get('/module/:id', getContentByModuleId);
contentRoutes.get('/lesson/:id', getContentByLessonId);
contentRoutes.put('/:id', updateContent);
contentRoutes.delete('/:id', deleteContent);

export default contentRoutes;