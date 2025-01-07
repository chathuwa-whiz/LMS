import { createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/ScheduleController.js';
import express from 'express';

const scheduleRoutes = express.Router();

scheduleRoutes.post('/', createSchedule);
scheduleRoutes.get('/:userId', getSchedules);
scheduleRoutes.put('/:scheduleId', updateSchedule);
scheduleRoutes.delete('/:scheduleId', deleteSchedule);

export default scheduleRoutes;