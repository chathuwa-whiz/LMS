import Reminder from "../model/Reminder.js";

// CREATE REMINDER
export const createReminder = async (req, res) => {
    try {
        const { userId, scheduleId, reminderTime, message } = req.body;
    
        const reminder = new Reminder({ 
            userId, 
            scheduleId, 
            reminderTime, 
            message 
        });

        const savedReminder = await reminder.save();
        
        res.status(201).json(savedReminder);
    
    } catch (error) {
        
        res.status(500).json({ error: error.message });

    }
};

// GET ALL REMINDERS BY USER ID
export const getReminders = async (req, res) => {
    try {
        
        const { userId } = req.params;
        
        const reminders = await Reminder.find({ userId });
        
        res.status(200).json(reminders);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// UPDATE AS SENT
export const markReminderAsSent = async (req, res) => {
    try {

        const { reminderId } = req.params;

        const updatedReminder = await Reminder.findOneAndUpdate(
            { reminderId },
            { isSent: true },
            { new: true }
        );

        if (!updatedReminder) {
            return res.status(404).json({ error: "Reminder not found." });
        }

        res.status(200).json(updatedReminder);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// DELETE REMINDER
export const deleteReminder = async (req, res) => {
    try {

        const { id } = req.params;

        const reminder = await Reminder.findById(id);

        if (!reminder) {
            return res.status(404).json({ error: "Reminder not found." });
        }

        await reminder.deleteOne();

        res.status(200).json({ message: "Reminder deleted successfully." });
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};