import { createAnswer, getAllAnswers, getAnswerById, updateAnswer, deleteAnswer } from '../controllers/AssesmentAnswerController.js';
import express from 'express';

const answerRoutes = express.Router();

answerRoutes.post("/", createAnswer);
answerRoutes.get("/", getAllAnswers);
answerRoutes.get("/:id", getAnswerById);
answerRoutes.put("/:id", updateAnswer);
answerRoutes.delete("/:id", deleteAnswer);

export default answerRoutes;