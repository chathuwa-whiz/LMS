import { Question, Answer } from "../model/Assesment.js";

// CREATE QUESTION

export const createQuestion = async (req, res) => {

    try {
        
        const { assesmentId, question, answerType, image } = req.body;

        const ass_question = new Question({
            assesmentId,
            question,
            answerType,
            image,
        });

        await ass_question.save();

        res.status(201).json(ass_question);

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
        const { assesmentId, question, answerType, image } = req.body;

        const ass_question = await Question.findById(id);

        if(!ass_question) {
            return res.status(404).json({ message: "Question not found" });
        }

        ass_question.assesmentId = assesmentId;
        ass_question.question = question;
        ass_question.answerType = answerType;
        ass_question.image = image;

        await ass_question.save();

        res.status(200).json(ass_question);
        
    } catch (error) {

        res.status(500).json({ message: error.message })
        
    }
    
};

// DELETE QUESTION WITH RELATED RESPONSES

export const deleteQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const question = await Question.findById(id);

        if(!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        await Response.deleteMany({ questionId : id });

        await question.deleteOne();

        res.status(200).json({ message: "Question deleted with responses successfully" });
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }

};