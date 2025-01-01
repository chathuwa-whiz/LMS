import mongoose from "mongoose";

const AssessmentAnswerSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    selectedAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
    }],
    score: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const AssessmentAnswer = mongoose.model('AssessmentAnswer', AssessmentAnswerSchema);

export default AssessmentAnswer;