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
        required: false, 
    },
    endTime: { 
        type: Date, 
        required: false, 
        validate: {
            validator: function (value) {
                return this.startTime < value;
            },
            message: "End time must be after start time",
        }
    },
}, { timestamps: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;