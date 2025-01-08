import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

// configure stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});

// create a checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const {line_items, customer_email} = req.body;

        if (!line_items || !customer_email) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items:line_items, // multiply unit_amount by 100 to convert to cents
            customer_email: customer_email,
            billing_address_collection: 'auto',
            success_url: 'http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/payment/cancel?session_id={CHECKOUT_SESSION_ID}',
        });

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get a checkout session
export const getCheckoutSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json({ error: 'Missing required parameter' });
        }

        const result = Promise.all([
            stripe.checkout.sessions.retrieve(sessionId, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(sessionId)
        ]);

        res.status(200).json(await result);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};