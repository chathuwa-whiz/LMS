import { createResponse, getAllResponses, getResponseById, updateResponse, deleteResponse } from '../controllers/AssesmentResponseController.js';
import express from 'express';

const responseRoutes = express.Router();

responseRoutes.post("/", createResponse);
responseRoutes.get("/", getAllResponses);
responseRoutes.get("/:id", getResponseById);
responseRoutes.put("/:id", updateResponse);
responseRoutes.delete("/:id", deleteResponse);

export default responseRoutes;