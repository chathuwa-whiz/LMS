import { createAnswer, getAllAnswers, getAnswerById, updateAnswer, deleteAnswer } from '../controllers/AssesmentAnswerController.js';
import express from 'express';
import upload from '../middleware/Multr.js';

const answerRoutes = express.Router();

answerRoutes.post("/", upload.single('image'), createAnswer);
answerRoutes.get("/", getAllAnswers);
answerRoutes.get("/:id", getAnswerById);
answerRoutes.put("/:id", upload.single('image'), updateAnswer);
answerRoutes.delete("/:id", deleteAnswer);

export default answerRoutes;