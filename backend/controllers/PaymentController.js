import Payment from "../model/Payment.js";
import User from "../model/User.js";

// CREATE PAYMENT

export const createPayment = async (req, res) => {
    try {

        const { userId, amount, status, paymentMethod, paymentRef, paymentDate } = req.body;

        const payment = new Payment({
            userId,
            amount,
            status,
            paymentMethod,
            paymentRef,
            paymentDate,
        });

        await payment.save();

        res.status(201).json(payment);
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// GET PAYMENTS BY USER ID

export const getPaymentsByUserId = async (req, res) => {
    try {

        const userId = req.params.userId;

        // validate user
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const payments = await Payment.find({ userId });

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

// GET PAYMENTS BY STATUS

export const getPaymentsByStatus = async (req, res) => {
    try {

        const status = req.params.status;

        const payments = await Payment.find({ status });

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

// GET PAYMENTS BY PAYMENT METHOD

export const getPaymentsByPaymentMethod = async (req, res) => {
    try {

        const paymentMethod = req.params.paymentMethod;

        const payments = await Payment.find({ paymentMethod });

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

// GET PAYMENTS BY PAYMENT DATE

export const getPaymentsByPaymentDate = async (req, res) => {
    try {

        const paymentDate = req.params.paymentDate;

        const payments = await Payment.find({ paymentDate });

        res.status(200).json(payments);
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// UPDATE PAYMENT

export const updatePayment = async (req, res) => {
    try {

        const paymentId = req.params.id;

        const { userId, amount, status, paymentMethod, paymentRef, paymentDate } = req.body;

        const payment = await Payment.findById(paymentId);

        if(!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        payment.userId = userId;
        payment.amount = amount;
        payment.status = status;
        payment.paymentMethod = paymentMethod;
        payment.paymentRef = paymentRef;
        payment.paymentDate = paymentDate;

        await payment.save();

        res.status(200).json(payment);
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// DELETE PAYMENT

export const deletePayment = async (req, res) => {
    try {

        const paymentId = req.params.id;

        await Payment.findByIdAndDelete(paymentId);

        res.status(200).json({ message: "Payment deleted successfully" });
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};