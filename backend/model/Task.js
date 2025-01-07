import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    dueDate: { 
        type: Date, 
        required: true, 
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: "Due date must be in the future.",
        },
    },
    isCompleted: { 
        type: Boolean, 
        default: false, 
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;