import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    moduleId: {
        type: String,
        ref: 'Module',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    contentType: {
        type: String,
        enum: ['Video', 'Text', 'Image', 'Audio', 'Other'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Not required for now
    },
    instructors: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false, // Not required for now
    },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;