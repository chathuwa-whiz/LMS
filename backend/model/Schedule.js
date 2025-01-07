import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
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
        validate: {
            validator: function (value) {
                return this.startTime < value;
            },
            message: "End time must be after start time",
        }
    },
}, { timestamps: true });

export const Schedule = mongoose.model("Schedule", scheduleSchema);