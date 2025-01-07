import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        index: true, 
    },
    scheduleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Schedule", 
    },
    reminderTime: { 
        type: Date, 
        required: false, //
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

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;