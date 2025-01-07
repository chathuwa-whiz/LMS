import Notification from "../model/Notification.js";

// SEND NOTIFICATION
export const sendNotification = async (req, res) => {
    try {

        const { userId, message, type } = req.body;

        const notification = new Notification({ 
            userId, 
            message, 
            type, 
        });
        
        const savedNotification = await notification.save();
        
        res.status(201).json(savedNotification);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// GET NOTIFICATIONS BY USER ID
export const getNotifications = async (req, res) => {
    try {

        const userId = req.params;
        
        const notifications = await Notification.find({ userId });
        
        res.status(200).json(notifications);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// MARK NOTIFICATION AS READ
export const markNotificationAsRead = async (req, res) => {
    try {

        const notificationId = req.params;

        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: notificationId },
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found." });
        }

        res.status(200).json(updatedNotification);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// DELETE NOTIFICATION
export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params;

        const deletedNotification = await Notification.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification not found." });
        }

        res.status(200).json({ message: "Notification deleted successfully." });
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};