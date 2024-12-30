import mongoose from 'mongoose';

const AssesmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
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
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionsId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
    },
    deadline: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const Assesment = mongoose.model('Assesment', AssesmentSchema);

const questionSchema = new mongoose.Schema({
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
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response",
    }],
}, {timestamps: true});

export const Question = mongoose.model('Question', questionSchema);

const ResponseSchema = new mongoose.Schema({
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
}, {timestamps: true});

export const Response = mongoose.model('Response', ResponseSchema);