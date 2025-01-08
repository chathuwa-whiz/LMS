import { Question, Answer } from "../model/Assesment.js";
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

// CREATE QUESTION

export const createQuestion = async (req, res) => {

    try {
        
        const { assesmentId, question, answerType } = req.body;

        let image;

        if(req.file) {
            // Upload image to Cloudinary and store the URL and public ID
            image = await cloudinary.uploader.upload(
                req.file.path,
                {
                    public_id: req.file.filename,
                    folder: 'lms-questions',
                }
            );

            // After uploading to Cloudinary, delete the file from the server
            fs.unlinkSync(req.file.path);
        }

        try {

            const ass_question = new Question({
                assesmentId,
                question,
                answerType,
                image : image ? { url: image.secure_url, public_id: image.public_id } : '',
            });
    
            await ass_question.save();
    
            res.status(201).json(ass_question);
            
        } catch (error) {

            // Delete the uploaded image from Cloudinary if an error occurs
            if (image && image.public_id) {
                await cloudinary.uploader.destroy(image.public_id).catch(err => {
                    console.error("Failed to delete image from Cloudinary:", err.message);
                });
            }
            throw error; // Rethrow the error to propagate it to the outer catch
            
        }

    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

};

// GET ALL QUESTIONS

export const getAllQuestions = async (req, res) => {

    try {
        
        const questions = await Question.find();

        res.status(200).json(questions);

    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }

};

// GET QUESTION BY ID

export const getQuestionById = async (req, res) => {

    try {
        
        const { id } = req.params;

        const question = await Question.findById(id);

        if(!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);

    } catch (error) {

        res.status(500).json({ message: error.message })
        
    }

};

// UPDATE QUESTION

export const updateQuestion = async (req, res) => {

    try {

        const { id } = req.params;
        const { assesmentId, question, answerType } = req.body;

        const ass_question = await Question.findById(id);

        if(!ass_question) {
            return res.status(404).json({ message: "Question not found" });
        }

        let newImage = ass_question.image; // Default to the current image
        let newPublicId = null; // Store the public_id of the new uploaded image

        if (req.file) {
            try {
                // Upload the new image to Cloudinary
                const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                    public_id: req.file.filename,
                    folder: 'lms-questions',
                });

                newImage = {
                    url: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id,
                };

                newPublicId = uploadedImage.public_id; // Track the new image's public_id

                // Delete the old image from Cloudinary if it exists
                if (ass_question.image && ass_question.image.public_id) {
                    await cloudinary.uploader.destroy(ass_question.image.public_id).catch(err => {
                        console.error("Failed to delete old image from Cloudinary:", err.message);
                    });
                }

                // Remove the uploaded file from the local server
                fs.unlinkSync(req.file.path);
            } catch (uploadError) {
                // If the upload fails, throw an error
                throw new Error(`Failed to upload new image: ${uploadError.message}`);
            }
        }

        try {

            ass_question.assesmentId = assesmentId;
            ass_question.question = question;
            ass_question.answerType = answerType;
            ass_question.image = newImage;

            await ass_question.save();

            res.status(200).json(ass_question);
            
        } catch (error) {

            // If an error occurs, delete the new uploaded image from Cloudinary
            if (newPublicId) {
                await cloudinary.uploader.destroy(newPublicId).catch(err => {
                    console.error("Failed to delete new image from Cloudinary:", err.message);
                });
            }

            throw updateError; // Rethrow the error to the outer catch block
            
        }
        
    } catch (error) {

        res.status(500).json({ message: error.message })
        
    }
    
};

// DELETE QUESTION WITH RELATED ANSWERS

export const deleteQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const question = await Question.findById(id);

        if(!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        await Answer.deleteMany({ questionId : id });

        await question.deleteOne();

        // After successful question and related data deletion, delete the images from Cloudinary
        if (question.image && question.image.public_id) {
            try {
                await cloudinary.uploader.destroy(question.image.public_id);
            } catch (err) {
                console.log("Error deleting image from Cloudinary:", err.message);
            }
        }

        res.status(200).json({ message: "Question deleted with answers successfully" });
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }

};