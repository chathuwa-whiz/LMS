import StudentAnswer from "../model/StudentAnswer.js";

// CREATE STUDENT ANSWER

export const createStudentAnswer = async (req, res) => {
    try {
        
        const { studentId, assessmentId, questionId, selectedAnswers } = req.body;

        const studentAnswer = await StudentAnswer.create({
            studentId,
            assessmentId,
            questionId,
            selectedAnswers
        });

        res.status(201).json(studentAnswer);

    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// GET ALL STUDENT ANSWERS

export const getAllStudentAnswers = async (req, res) => {
    try {
        
        const studentAnswers = await StudentAnswer.find();

        res.status(200).json(studentAnswers);

    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET STUDENT ANSWER BY ID

export const getStudentAnswerById = async (req, res) => {
    try {

        const { id } = req.params;
        
        const studentAnswer = await StudentAnswer.findById(id);

        res.status(200).json(studentAnswer);

    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// UPDATE STUDENT ANSWER BY ID

export const updateStudentAnswerById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { studentId, assessmentId, questionId, selectedAnswers } = req.body;

        const studentAnswer = await StudentAnswer.findById(id);

        if(!studentAnswer) {
            return res.status(404).json({ message: "Student Answer not found" });
        }

        studentAnswer.studentId = studentId;
        studentAnswer.assessmentId = assessmentId;
        studentAnswer.questionId = questionId;
        studentAnswer.selectedAnswers = selectedAnswers;

        await studentAnswer.save();

    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// DELETE STUDENT ANSWER BY ID

export const deleteStudentAnswerById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const studentAnswer = await StudentAnswer.findById(id);

        if(!studentAnswer) {
            return res.status(404).json({ message: "Student Answer not found" });
        }

        await studentAnswer.deleteOne();

        res.status(200).json({ message: "Student Answer deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};