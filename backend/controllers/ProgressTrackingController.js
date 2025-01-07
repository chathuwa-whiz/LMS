import ProgressTracking from "../model/ProgressTracking.js";

// ADD USER PROGRESS
export const addProgressTracking = async (req, res) => {
    try {

        const { userId, courseId, completedLessons, percentage, lastAccessed } = req.body;

        const progressTracking = new ProgressTracking({
            userId,
            courseId,
            completedLessons,
            percentage,
            lastAccessed,
        });

        await progressTracking.save();

        res.status(201).json(progressTracking);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }
};

// GET USER PROGRESS BY USER ID

export const getProgressTrackingByUser = async (req, res) => {
    try {

        const userId = req.params.userId;

        const progressTracking = await ProgressTracking.find({ userId });

        res.status(200).json(progressTracking);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET USER PROGRESS BY USER ID AND COURSE ID

export const getProgressTrackingByCourse = async (req, res) => {
    try {

        const userId = req.params.userId;
        const courseId = req.params.courseId;

        const progressTracking = await ProgressTracking.find({ userId, courseId });

        res.status(200).json(progressTracking);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// UPDATE USER PROGRESS

export const updateProgressTracking = async (req, res) => {
    try {

        const { userId, courseId, completedLessons, percentage, lastAccessed } = req.body;

        const progressTracking = await ProgressTracking.findOne({ userId, courseId });

        if (!progressTracking) {
            return res.status(404).json({ message: 'Progress Tracking not found' });
        }

        progressTracking.userId = userId;
        progressTracking.courseId = courseId;
        progressTracking.completedLessons = completedLessons;
        progressTracking.percentage = percentage;
        progressTracking.lastAccessed = lastAccessed;

        await progressTracking.save();

        res.status(200).json(progressTracking);

    } catch (error) {
        
        res.status(409).json({ message: error.message });

    }
};

// DELETE USER PROGRESS

export const deleteProgressTracking = async (req, res) => {
    try {

        const userId = req.params.userId;
        const courseId = req.params.courseId;

        const progressTracking = await ProgressTracking.findOneAndDelete({ userId, courseId });

        if (!progressTracking) {
            return res.status(404).json({ message: 'Progress Tracking not found' });
        }

        res.status(200).json({ message: 'Progress Tracking deleted successfully' });

    } catch (error) {

        res.status(409).json({ message: error.message });

    }
};