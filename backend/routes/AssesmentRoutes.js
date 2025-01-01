import { createAssesment, getAllAssesments, getAssesmentById, updateAssesment, deleteAssesment } from '../controllers/AssesmentController.js';
import express from 'express';

const assesmentRoutes = express.Router();

assesmentRoutes.post('/', createAssesment);
assesmentRoutes.get('/', getAllAssesments);
assesmentRoutes.get('/:id', getAssesmentById);
assesmentRoutes.put('/:id', updateAssesment);
assesmentRoutes.delete('/:id', deleteAssesment);

export default assesmentRoutes;