import { Response } from "../model/Assesment.js";

// CREATE RESPONSE

export const createResponse = async (req, res) => {

    try {
        
        const { questionId, answers } = req.body;

        const response = new Response({
            questionId,
            answers
        });

        await response.save();

        res.status(201).json(response);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET ALL RESPONSES

export const getAllResponses = async (req, res) => {

    try {
        
        const responses = await Response.find();

        res.status(200).json(responses);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET RESPONSE BY ID

export const getResponseById = async (req, res) => {

    try {

        const { id } = req.params;
        
        const response = await Response.findById(id);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.status(200).json(response);

    }
    catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// UPDATE RESPONSE

export const updateResponse = async (req, res) => {

    try {
        
        const { id } = req.params;
        const { questionId, answers } = req.body;

        const response = await Response.findById(id);

        if(!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        response.questionId = questionId;
        response.answers = answers;

        await response.save();

        res.status(200).json(response);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// DELETE RESPONSE

export const deleteResponse = async (req, res) => {

    try {
        
        const { id } = req.params;

        const response = await Response.findById(id);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        await response.deleteOne();

        res.status(200).json({ message: "Response deleted successfully" });

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};