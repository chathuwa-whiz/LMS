import { sendNotification, getNotifications, markNotificationAsRead, deleteNotification } from '../controllers/NotificationController.js';
import express from 'express';

const notificationRoutes = express.Router();

notificationRoutes.post('/', sendNotification);
notificationRoutes.get('/:userId', getNotifications);
notificationRoutes.put('/:id', markNotificationAsRead);
notificationRoutes.delete('/:id', deleteNotification);

export default notificationRoutes;