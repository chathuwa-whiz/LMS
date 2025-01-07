import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController.js';
import express from 'express';

const taskRoutes = express.Router();

taskRoutes.post('/', createTask);
taskRoutes.get('/:userId', getTasks);
taskRoutes.put('/:id', updateTask);
taskRoutes.delete('/:id', deleteTask);

export default taskRoutes;