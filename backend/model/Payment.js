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
        enum: ['Pending', 'Completed'],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'Cash', 'Bank Transfer'],
        required: true,
    },
    paymentRef: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const Payment = mongoose.model('Payment', paymentSchema);