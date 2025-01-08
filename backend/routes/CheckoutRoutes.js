import express from 'express';
import { createCheckoutSession,  getCheckoutSession } from '../config/stripe.js';

const checkoutRoutes = express.Router();

checkoutRoutes.post('/', createCheckoutSession);
checkoutRoutes.get('/:sessionId', getCheckoutSession);

export default checkoutRoutes;