import Enrollment from "../model/Enrollment.js";
import Payment from "../model/Payment.js";
import Course from "../model/Course.js";
import User from "../model/User.js";

// CREATE ENROLLMENT

export const createEnrollment = async (req, res) => {
    try {

        const { userId, courseId, paymentId, status } = req.body;

        const enrollment = new Enrollment({
            userId,
            courseId,
            paymentId,
            status,
        });

        await enrollment.save();

        res.status(201).json(enrollment);
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};

// GET ENROLLMENTS BY USER ID

export const getEnrollmentsByUserId = async (req, res) => {
    try {

        const userId = req.params.userId;

        // validate user
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const enrollments = await Enrollment.find({ userId });

        res.status(200).json(enrollments);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

// GET ENROLLMENTS BY COURSE ID

export const getEnrollmentsByCourseId = async (req, res) => {
    try {

        const courseId = req.params.courseId;

        // validate course
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const enrollments = await Enrollment.find({ courseId });

        res.status(200).json(enrollments);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

// GET ENROLLMENTS BY PAYMENT ID

export const getEnrollmentsByPaymentId = async (req, res) => {
    try {

        const paymentId = req.params.paymentId;

        // validate payment
        const payment = await Payment.findById(paymentId);
        if(!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        const enrollments = await Enrollment.find({ paymentId });

        res.status(200).json(enrollments);
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
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

        res.status(500).json({ message: error.message });
        
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

        res.status(200).json({ message: "Enrollment deleted successfully" });
        
    } catch (error) {

        res.status(500).json({ message: error.message });
        
    }
};