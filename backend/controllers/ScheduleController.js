import Schedule from "../model/Schedule.js";

// CREATE SCHEDULE
export const createSchedule = async (req, res) => {
    try {
        const { userId, title, description, startTime, endTime } = req.body;

        // Validate start and end times
        if (new Date(startTime) >= new Date(endTime)) {
            return res.status(400).json({ error: "Start time must be before end time." });
        }

        const schedule = new Schedule({
            userId,
            title,
            description,
            startTime,
            endTime,
        });

        const savedSchedule = await schedule.save();

        res.status(201).json(savedSchedule);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// GET SCHEDULES BY USER ID
export const getSchedules = async (req, res) => {
    try {
        const userId = req.params;

        const schedules = await Schedule.find({ userId });

        res.status(200).json(schedules);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// UPDATE SCHEDULE
export const updateSchedule = async (req, res) => {
    try {
        const scheduleId = req.params;
        
        const newSchedule = req.body;

        const updatedSchedule = await Schedule.findOneAndUpdate(
            { _id: scheduleId },
            newSchedule,
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ error: "Schedule not found." });
        }

        res.status(200).json(updatedSchedule);

    } catch (error) {
        
        res.status(500).json({ error: error.message });
    
    }
};

// DELETE SCHEDULE
export const deleteSchedule = async (req, res) => {
    try {
        const scheduleId = req.params;

        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return res.status(404).json({ error: "Schedule not found." });
        }

        res.status(200).json({ message: "Schedule deleted successfully." });

    } catch (error) {
        
        res.status(500).json({ error: error.message });
    
    }
};