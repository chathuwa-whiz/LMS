import { createQuestion, getAllQuestions, getQuestionById, updateQuestion,  deleteQuestion } from '../controllers/AssesmentQuestionController.js';
import express from 'express';
import upload from '../middleware/Multr.js';

const questionRoutes = express.Router();

questionRoutes.post('/', upload.single('image'), createQuestion);
questionRoutes.get('/', getAllQuestions);
questionRoutes.get('/:id', getQuestionById);
questionRoutes.put('/:id', upload.single('image'), updateQuestion);
questionRoutes.delete('/:id', deleteQuestion);

export default questionRoutes;