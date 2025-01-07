import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        index: true,
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

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;