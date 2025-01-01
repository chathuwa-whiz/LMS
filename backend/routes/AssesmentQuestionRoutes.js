import { createQuestion, getAllQuestions, getQuestionById, updateQuestion,  deleteQuestion } from '../controllers/AssesmentQuestionController.js';
import express from 'express';

const questionRoutes = express.Router();

questionRoutes.post('/', createQuestion);
questionRoutes.get('/', getAllQuestions);
questionRoutes.get('/:id', getQuestionById);
questionRoutes.put('/:id', updateQuestion);
questionRoutes.delete('/:id', deleteQuestion);

export default questionRoutes;