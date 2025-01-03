import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        enum: ['video', 'text', 'image', 'file'],
        required: true,
    },
    url: {
        type: String,
        required: function () {
            return this.contentType === 'Video' || this.contentType === 'File' || this.contentType === 'Image';
        },
    },
    text: {
        type: String,
        required: function () {
            return this.contentType === 'text';
        },
    },
    courseId: {
        type: String,
        ref: 'Course',
        required: true,
    },
    moduleId: {
        type: String,
        ref: 'Module',
        required: false,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: false,
    },
}, { timestamps: true });

const Content = mongoose.model('Content', ContentSchema);

export default Content;