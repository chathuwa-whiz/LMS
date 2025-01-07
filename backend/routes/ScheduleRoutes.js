import { createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/ScheduleController.js';
import express from 'express';

const scheduleRoutes = express.Router();

scheduleRoutes.post('/', createSchedule);
scheduleRoutes.get('/', getSchedules);
scheduleRoutes.put('/:scheduleId', updateSchedule);
scheduleRoutes.delete('/:id', deleteSchedule);

export default scheduleRoutes;