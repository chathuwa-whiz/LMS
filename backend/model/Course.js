// Create, update, and manage courses, including adding modules, lessons, and assignments.

import mongoose from 'mongoose';

const courseSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true,
    },
    instructor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['Science', 'Math', 'History', 'English', 'Art', 'Music', 'Physical Education', 'Computer Science', 'Other'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);

const moduleSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
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
}, { timestamps: true });

export const Module = mongoose.model('Module', moduleSchema);

const lessonSchema = new Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
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
}, { timestamps: true });

export const Lesson = mongoose.model('Lesson', lessonSchema);