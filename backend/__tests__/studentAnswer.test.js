import mongoose from 'mongoose';
import request from 'supertest';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StudentAnswer from '../model/StudentAnswer.js';
import { Answer, Question, Assesment } from '../model/Assesment.js';
import connectDB from '../config/db.js';
import Course from '../model/Course.js';

dotenv.config();

jest.setTimeout(10000);

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectDB();
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    // await new Promise(resolve => setTimeout(resolve, 5000));  // wait for 5 seconds
    await mongoose.connection.close();
});

describe('StudentAnswer Model Test', () => {

    it('should create a StudentAnswer document for single answer question', async () => {
        const user = new User({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@gmail.com',
            password: '11111',
            role: 'admin',
            dateOfBirth: '1990-01-01',
        });
        await user.save();
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const newCourse = new Course({
            title: 'Test Course',
            description: 'Test Course Description',
            category: 'IT'
        });
        await newCourse.save();

        const newAssesment = new Assesment({
            courseId: newCourse._id,
            title: 'Test Assesment',
            type: 'Quiz',
        });
        await newAssesment.save();

        const newQuestion = new Question({
            assesmentId: newAssesment._id,
            question: 'What is the capital of Sri Lanka?',
            answerType: 'single',
        });
        await newQuestion.save();

        const answers = new Answer({
            questionId: newQuestion._id,
            answers: [
                {answer: 'Colombo', answerType: 'text', isCorrect: true},
                {answer: 'Kandy', answerType: 'text', isCorrect: false},
                {answer: 'Galle', answerType: 'text', isCorrect: false},
                {answer: 'Jaffna', answerType: 'text', isCorrect: false},
            ]
        });
        await answers.save();
        
    });

    // it('should calculate score for single-answer questions', async () => {
    //     const question = new Question({
    //         _id: new mongoose.Types.ObjectId(),
    //         answerType: 'single',
    //     });
    //     await question.save();

    //     const correctAnswer = new Answer({
    //         questionId: question._id,
    //         answers: [{ _id: new mongoose.Types.ObjectId(), isCorrect: true }],
    //     });
    //     await correctAnswer.save();

    //     const studentAnswer = new StudentAnswer({
    //         studentId: new mongoose.Types.ObjectId(),
    //         assessmentId: new mongoose.Types.ObjectId(),
    //         questionId: question._id,
    //         selectedAnswers: [correctAnswer.answers[0]._id],
    //     });

    //     const savedStudentAnswer = await studentAnswer.save();
    //     expect(savedStudentAnswer.score).toBe(1);
    // });

    // it('should calculate score for multiple-answer questions', async () => {
    //     const question = new Question({
    //         _id: new mongoose.Types.ObjectId(),
    //         answerType: 'multiple',
    //     });
    //     await question.save();

    //     const correctAnswer1 = new Answer({
    //         questionId: question._id,
    //         answers: [{ _id: new mongoose.Types.ObjectId(), isCorrect: true }],
    //     });
    //     const correctAnswer2 = new Answer({
    //         questionId: question._id,
    //         answers: [{ _id: new mongoose.Types.ObjectId(), isCorrect: true }],
    //     });
    //     await correctAnswer1.save();
    //     await correctAnswer2.save();

    //     const studentAnswer = new StudentAnswer({
    //         studentId: new mongoose.Types.ObjectId(),
    //         assessmentId: new mongoose.Types.ObjectId(),
    //         questionId: question._id,
    //         selectedAnswers: [correctAnswer1.answers[0]._id, correctAnswer2.answers[0]._id],
    //     });

    //     const savedStudentAnswer = await studentAnswer.save();
    //     expect(savedStudentAnswer.score).toBe(1);
    // });

    // it('should calculate score as 0 when no correct answers are provided', async () => {
    //     const question = new Question({
    //         _id: new mongoose.Types.ObjectId(),
    //         answerType: 'single',
    //     });
    //     await question.save();

    //     const incorrectAnswer = new Answer({
    //         questionId: question._id,
    //         answers: [{ _id: new mongoose.Types.ObjectId(), isCorrect: false }],
    //     });
    //     await incorrectAnswer.save();

    //     const studentAnswer = new StudentAnswer({
    //         studentId: new mongoose.Types.ObjectId(),
    //         assessmentId: new mongoose.Types.ObjectId(),
    //         questionId: question._id,
    //         selectedAnswers: [incorrectAnswer.answers[0]._id],
    //     });

    //     const savedStudentAnswer = await studentAnswer.save();
    //     expect(savedStudentAnswer.score).toBe(0);
    // });

    // it('should calculate score as 0 when no answers are provided', async () => {
    //     const question = new Question({
    //         _id: new mongoose.Types.ObjectId(),
    //         answerType: 'single',
    //     });
    //     await question.save();

    //     const studentAnswer = new StudentAnswer({
    //         studentId: new mongoose.Types.ObjectId(),
    //         assessmentId: new mongoose.Types.ObjectId(),
    //         questionId: question._id,
    //         selectedAnswers: [],
    //     });

    //     const savedStudentAnswer = await studentAnswer.save();
    //     expect(savedStudentAnswer.score).toBe(0);
    // });
});