import { createReminder, getReminders, markReminderAsSent, deleteReminder } from '../controllers/ReminderController.js';
import express from 'express';

const reminderRoutes = express.Router();

reminderRoutes.post('/', createReminder);
reminderRoutes.get('/:userId', getReminders);
reminderRoutes.put('/:id', markReminderAsSent);
reminderRoutes.delete('/:id', deleteReminder);

export default reminderRoutes;