import { createStudentAnswer, getAllStudentAnswers, getStudentAnswerById, updateStudentAnswerById, deleteStudentAnswerById } from '../controllers/StudentAnswerController.js';
import express from 'express';

const studentAnswerRoutes = express.Router();

studentAnswerRoutes.post("/", createStudentAnswer);
studentAnswerRoutes.get("/", getAllStudentAnswers);
studentAnswerRoutes.get("/:id", getStudentAnswerById);
studentAnswerRoutes.put("/:id", updateStudentAnswerById);
studentAnswerRoutes.delete("/:id", deleteStudentAnswerById);

export default studentAnswerRoutes;