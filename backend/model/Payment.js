import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash', 'bank-transfer'],
        required: true,
    },
    paymentRef: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: false, // not required for now
        default: Date.now,
    },
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;