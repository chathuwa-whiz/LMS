import Enrollment from "../model/Enrollment.js";

// CREATE ENROLLMENT

export const createEnrollment = async (req, res) => {
    try {

        const { userId, courseId, paymentId } = req.body;

        const enrollment = new Enrollment({
            userId,
            courseId,
            paymentId,
        });

        const createdEnrollment = await enrollment.save();

        res.status(201).json(createdEnrollment);
        
    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
        
    }
};

// GET ENROLLMENTS BY USER ID

export const getEnrollmentsByUserId = async (req, res) => {
    try {

        const userId = req.params.userId;

        const enrollments = await Enrollment.find({ userId });

        res.status(200).json(enrollments);

    } catch (error) {

        res.status(500).json({ message: "Internal server error" });

    }
};

// GET ENROLLMENTS BY COURSE ID

export const getEnrollmentsByCourseId = async (req, res) => {
    try {

        const courseId = req.params.courseId;

        const enrollments = await Enrollment.find({ courseId });

        res.status(200).json(enrollments);

    } catch (error) {

        res.status(500).json({ message: "Internal server error" });

    }
};

// UPDATE ENROLLMENT

export const updateEnrollment = async (req, res) => {
    try {

        const { userId, courseId, paymentId, status } = req.body;

        const enrollment = await Enrollment.findOne({
            userId,
            courseId,
            paymentId,
        });

        if(!enrollment) {
            res.status(404).json({ message: "Enrollment not found" });
        }

        enrollment.status = status;

        await enrollment.save();

        res.status(200).json(enrollment);
        
    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
        
    }
};

// DELETE ENROLLMENT

export const deleteEnrollment = async (req, res) => {
    try {

        const { userId, courseId, paymentId } = req.body;

        const enrollment = await Enrollment.findOneAndDelete({
            userId,
            courseId,
            paymentId,
        });

        if(!enrollment) {
            res.status(404).json({ message: "Enrollment not found" });
        }

        res.status(200).json(enrollment);
        
    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
        
    }
};