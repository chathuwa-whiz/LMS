import mongoose from "mongoose";
import Course from "./Course.js";

// Counter schema for tracking module indices
const counterSchema = new mongoose.Schema({
    category: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },
});

export const Counter = mongoose.model('Counter', counterSchema);

// Helper function to generate a custom _id
const generateModuleId = async (courseId) => {
    // Fetch course details
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");

    const category = course.category;

    // Get the first two digits of the current year
    const year = new Date().getFullYear().toString().slice(2, 4);

    // Increment and fetch the counter for the category
    const counter = await Counter.findOneAndUpdate(
        { category: category },
        { $inc: { index: 1 } },
        { new: true, upsert: true }
    );

    // Generate the module ID
    return `${category}${year}${counter.index.toString().padStart(2, "0")}`;
};

// Module schema
const moduleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    courseId: {
        type: String,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    lic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // Not required for now
    },
    lectures: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false, // Not required for now
    },
    instructors: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false, // Not required for now
    },
}, { timestamps: true });

// Pre-save hook for custom _id generation
moduleSchema.pre('save', async function (next) {
    
    this._id = await generateModuleId(this.courseId);
    
    next();
});

const Module = mongoose.model('Module', moduleSchema);

export default Module;
