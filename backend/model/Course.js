// Create, update, and manage courses, including adding modules, lessons, and assignments.

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: function() {
            const category = this.category;
            const year = new Date().getFullYear().toString().slice(2, 4);
            const title = this.title.replace(/\s/g, '').toUpperCase();
            return category + year + title;
        }
    },    
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true,
    },
    category: {
        type: String,
        enum: ['IT', 'BS', 'EN', 'HS', 'AR'], // IT, Business, Engineering, Human Science, Architecture
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

const Course = mongoose.model('Course', courseSchema);

export default Course;