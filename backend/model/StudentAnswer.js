import mongoose from "mongoose";
import { Answer, Question } from "./Assesment.js";

const StudentAnswerSchema = new mongoose.Schema({
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
        required: false,
    },
}, {timestamps: true});


// Calculate the score for the student answer

StudentAnswerSchema.pre('save', async function(next) {
    // Retrieve the question and response objects
    const answers = await Answer.find({ questionId: this.questionId });
    const question = await Question.findById(this.questionId);

    console.log('Question:', question);
    console.log('Responses:', answers);

    // No response exists for the question
    if (!answers || answers.length === 0) {
        this.score = 0;
        return next();  // proceed to save
    }

    // Collect all correct answers from the answers
    const correctAnswers = answers.flatMap(response => 
        response.answers.filter(answer => answer.isCorrect === true)
    );
    const totalCorrectAnswers = correctAnswers.length;

    console.log('Correct answers:', correctAnswers);
    console.log('Total correct answers:', totalCorrectAnswers);

    // No correct answers to score
    if (totalCorrectAnswers === 0) {
        this.score = 0;
        return next();  // proceed to save
    }

    let score = 0;

    // Handle scoring for different answer types
    if (question.answerType === 'single') {
        // For single-answer questions, score is either 0 or 1
        const selectedAnswer = this.selectedAnswers[0]; // Only one selected answer for single-answer questions

        console.log('Selected answer:', selectedAnswer);

        // Check if the selected answer is correct
        const isCorrect = correctAnswers.some(correctAnswer =>
            correctAnswer._id.toString() === selectedAnswer.toString()
        );

        console.log('Is correct:', isCorrect);

        if (isCorrect) {
            score = 1; // Full score for correct answer
        }
    } else if (question.answerType === 'multiple') {
        // For multiple-answer questions, distribute score among correct answers
        let correctSelections = 0;

        // Check how many selected answers are correct
        for (let selectedAnswerId of this.selectedAnswers) {
            const isCorrect = correctAnswers.some(correctAnswer =>
                correctAnswer.answer.toString() === selectedAnswerId.toString()
            );

            if (isCorrect) {
                correctSelections += 1; // Increment correct selections
            }
        }

        // Calculate score as the fraction of correct answers selected
        score = correctSelections / totalCorrectAnswers;
    }

    console.log('Score:', score);

    this.score = score; // Set the calculated score

    return next();  // proceed to save
});

const StudentAnswer = mongoose.model('StudentAnswer', StudentAnswerSchema);

export default StudentAnswer;