import { Assesment, Question, Response } from "../model/Assesment.js";

// CREATE ASSESMENT

export const createAssesment = async (req, res) => {

    try {
        
        const { courseId, title, description, type, guidlines, lecture, deadline } = req.body;

        const assesment = new Assesment({
            courseId,
            title,
            description,
            type,
            guidlines,
            lecture,
            deadline,
        });

        await assesment.save();

        res.status(201).json(assesment);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET ALL ASSESMENTS

export const getAllAssesments = async (req, res) => {

    try {
        
        const assesments = await Assesment.find();

        res.status(200).json(assesments);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET ASSESMENT BY ID

export const getAssesmentById = async (req, res) => {

    try {

        const { id } = req.params;
        
        const assesment = await Assesment.findById(id);

        res.status(200).json(assesment);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// UPDATE ASSESMENT

export const updateAssesment = async (req, res) => {

    try {

        const { id } = req.params;
        
        const { courseId, title, description, type, guidlines, lecture, deadline } = req.body;

        const assesment = await Assesment.findById(id);

        if(!assesment) {
            return res.status(404).json({ message: "Assesment not found" });
        }

        assesment.courseId = courseId;
        assesment.title = title;
        assesment.description = description;
        assesment.type = type;
        assesment.guidlines = guidlines;
        assesment.lecture = lecture;
        assesment.deadline = deadline;

        await assesment.save();

        res.status(200).json(assesment);

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

export const deleteAssesment = async (req, res) => {

    try {

        const { id } = req.params;

        const assesment = await Assesment.findById(id);

        if(assesment) {
            // get all questions related to assesment
            const questions = await Question.find( { assesmentId: id } );
            
            // delete all responses related to questions
            for(const question of questions) {
                await Response.deleteMany( { questionId: question._id } );
            }

            // delete all questions related to assesment
            await Question.deleteMany( { assesmentId: id } );

            // delete assesment
            await assesment.deleteOne();

            res.status(200).json({ message: "Assesment deleted successfully" });

        }
        
    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};