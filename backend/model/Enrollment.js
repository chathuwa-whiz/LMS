import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
    status: {
        type: String,
        enum: ["enrolled", "unenrolled"],
        default: "unenrolled",
    },
}, {timestamps: true});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;