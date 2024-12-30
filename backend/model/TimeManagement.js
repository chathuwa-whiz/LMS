// Implement features like scheduling, calendars for deadlines, reminders, and task prioritization.

import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
    },
    startTime: { 
        type: Date, 
        required: true, 
    },
    endTime: { 
        type: Date, 
        required: true, 
    },
}, { timestamps: true });

export const Schedule = mongoose.model("Schedule", scheduleSchema);

const reminderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
    },
    scheduleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Schedule", 
    },
    reminderTime: { 
        type: Date, 
        required: true, 
    },
    message: { 
        type: String, 
        required: true, 
    },
    isSent: { 
        type: Boolean, 
        default: false, 
    },
}, { timestamps: true });

export const Reminder = mongoose.model("Reminder", reminderSchema);

const taskSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
    },
    scheduleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Schedule", 
    },
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    dueDate: { 
        type: Date, 
        required: true, 
    },
    isCompleted: { 
        type: Boolean, 
        default: false, 
    },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

const notificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
    },
    message: { 
        type: String, 
        required: true, 
    },
    sentAt: { 
        type: Date, 
        default: Date.now, 
    },
    isRead: { 
        type: Boolean, 
        default: false,  
    },
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);
