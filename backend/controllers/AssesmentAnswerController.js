import { Answer } from "../model/Assesment.js";
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

// CREATE ANSWER

export const createAnswer = async (req, res) => {
    try {
        const { questionId, answers } = req.body;
        const uploadedAnswers = [];

        for (const answer of answers) {
            if (answer.answerType === 'image' && req.file) {
                // Upload image to Cloudinary and store the URL and public ID
                const image = await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        public_id: req.file.filename,
                        folder: 'lms-answers',
                    }
                );

                // After uploading to Cloudinary, delete the file from the server
                fs.unlinkSync(req.file.path);

                uploadedAnswers.push({
                    answer: { url: image.secure_url, public_id: image.public_id },
                    answerType: answer.answerType,
                    isCorrect: answer.isCorrect,
                });
            } else {
                uploadedAnswers.push(answer);
            }
        }

        const newAnswer = new Answer({
            questionId,
            answers: uploadedAnswers,
        });

        await newAnswer.save();

        res.status(201).json(newAnswer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL ANSWERS

export const getAllAnswers = async (req, res) => {

    try {
        
        const answers = await Answer.find();

        res.status(200).json(answers);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET ANSWER BY ID

export const getAnswerById = async (req, res) => {

    try {

        const { id } = req.params;
        
        const answer = await Answer.findById(id);

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        res.status(200).json(answer);

    }
    catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// UPDATE ANSWER

export const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionId, answers } = req.body;

        const answer = await Answer.findById(id);

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        const updatedAnswers = [];

        for (const ans of answers) {
            if (ans.answerType === 'image' && req.file) {
                // Upload new image to Cloudinary and store the URL and public ID
                const image = await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        public_id: req.file.filename,
                        folder: 'lms-answers',
                    }
                );

                // After uploading to Cloudinary, delete the file from the server
                fs.unlinkSync(req.file.path);

                // If there's an existing image, delete it from Cloudinary
                const existingAnswer = answer.answers.find(a => a.answerType === 'image');
                if (existingAnswer && existingAnswer.answer.public_id) {
                    await cloudinary.uploader.destroy(existingAnswer.answer.public_id);
                }

                updatedAnswers.push({
                    answer: { url: image.secure_url, public_id: image.public_id },
                    answerType: ans.answerType,
                    isCorrect: ans.isCorrect,
                });
            } else {
                updatedAnswers.push(ans);
            }
        }

        answer.questionId = questionId;
        answer.answers = updatedAnswers;

        await answer.save();

        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE ANSWER

export const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findById(id);

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        // Delete images from Cloudinary if they exist
        for (const ans of answer.answers) {
            if (ans.answerType === 'image' && ans.answer.public_id) {
                await cloudinary.uploader.destroy(ans.answer.public_id);
            }
        }

        await answer.deleteOne();

        res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};