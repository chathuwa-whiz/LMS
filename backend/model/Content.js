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
        enum: ['Video', 'Text', 'Image', 'File'],
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
            return this.contentType === 'Text';
        },
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: false,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: false,
    },
}, { timestamps: true });

export const Content = mongoose.model('Content', ContentSchema);