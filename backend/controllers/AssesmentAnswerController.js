import { Answer } from "../model/Assesment.js";

// CREATE ANSWER

export const createAnswer = async (req, res) => {

    try {
        
        const { questionId, answers } = req.body;

        const answer = new Answer({
            questionId,
            answers
        });

        await answer.save();

        res.status(201).json(answer);

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

        if(!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        answer.questionId = questionId;
        answer.answers = answers;

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

        await answer.deleteOne();

        res.status(200).json({ message: "Answer deleted successfully" });

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};