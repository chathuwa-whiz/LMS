import mongoose from 'mongoose';

const ProgressTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: String,
        ref: 'Course',
        required: true,
    },
    completedLessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
    ],
    percentage: {
        type: Number,
        default: 0,
    },
    lastAccessed: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const ProgressTracking = mongoose.model('ProgressTracking', ProgressTrackingSchema);

export default ProgressTracking;