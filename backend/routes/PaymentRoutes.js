import { createPayment, getPaymentsByPaymentDate, getPaymentsByPaymentMethod, getPaymentsByStatus, getPaymentsByUserId, updatePayment, deletePayment } from '../controllers/PaymentController.js';
import express from 'express';

const paymentRoutes = express.Router();

paymentRoutes.post('/', createPayment);
paymentRoutes.get('/user/:userId', getPaymentsByUserId);
paymentRoutes.get('/status/:status', getPaymentsByStatus);
paymentRoutes.get('/paymentMethod/:paymentMethod', getPaymentsByPaymentMethod);
paymentRoutes.get('/paymentDate/:paymentDate', getPaymentsByPaymentDate);
paymentRoutes.put('/:id', updatePayment);
paymentRoutes.delete('/:id', deletePayment);

export default paymentRoutes;