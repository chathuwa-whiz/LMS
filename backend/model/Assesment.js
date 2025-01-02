import mongoose from 'mongoose';

const AssesmentSchema = new mongoose.Schema({
    courseId: {
        type: String,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Quiz', 'Assignment'],
        required: true,
    },
    guidlines: {
        type: [mongoose.Schema.Types.Mixed],
        required: false,
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    deadline: {
        type: Date,
        required: false,
        default: function() {
            // Default deadline is 7 days from now
            return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        }
    },
}, {timestamps: true});

export const Assesment = mongoose.model('Assesment', AssesmentSchema);

const questionSchema = new mongoose.Schema({
    assesmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assesment',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answerType: {
        type: String,
        enum: ['single', 'multiple'],
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export const Question = mongoose.model('Question', questionSchema);

const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    answers: [
        {
            answer: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            },
            answerType: {
                type: String,
                enum: ['text', 'image', 'number'],
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
            },
        }
    ],
}, {timestamps: true});

export const Answer = mongoose.model('Answer', AnswerSchema);