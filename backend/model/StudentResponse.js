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
        default: async function() {
            // Retrieve the question and response objects
            const response = await Answer.find({ questionId: this.questionId });
            const question = await Question.findById(this.questionId);

            if(!response) return 0; // no response exists for the question

            const correctAnswers = response.answers.filter(answer => answer.isCorrect === true);
            const totalCorrectAnswers = correctAnswers.length;

            if (totalCorrectAnswers === 0) {
                return 0; // No correct answers to score
            }

            let score = 0;

            // Handle scoring for different answer types
            if (question.answerType === 'single') {
                // For single-answer questions, score is either 0 or 1
                const selectedAnswer = this.selectedAnswers[0]; // Only one selected answer for single-answer questions

                // Check if the selected answer is correct
                const isCorrect = correctAnswers.some(correctAnswer =>
                    correctAnswer.answer.toString() === selectedAnswer.toString()
                );

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

            return score; // Return the calculated score
        }
    },
}, {timestamps: true});

const StudentAnswer = mongoose.model('StudentAnswer', StudentAnswerSchema);

export default StudentAnswer;