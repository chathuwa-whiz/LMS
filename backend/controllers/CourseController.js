import Course from '../model/Course.js';
import Module from '../model/Module.js';

// CREATE COURSE

export const createCourse = async (req, res) => {
    try {      
        const { title, description, category, price, isPublished } = req.body;

        const course = new Course({
            title,
            description,
            category,
            price,
            isPublished,
        });

        await course.save();

        res.status(201).json(course);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET ALL COURSES

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET COURSE BY ID

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);

        res.status(200).json(course);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE COURSE

export const updateCourse = async (req, res) => {
    try {
        const { title, description, category, price, isPublished } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            course.title = title;
            course.description = description;
            course.category = category;
            course.price = price;
            course.isPublished = isPublished;

            await course.save();

            res.status(200).json(course);

        } else {
            res.status(404).json({ message: 'Course not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE COURSE AND RELATED MODULES

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await course.deleteOne();
            
            await Module.deleteMany({ courseId: req.params.id });

            res.status(200).json({ message: 'Course and related modules deleted successfully' });

        } else {
            res.status(404).json({ message: 'Course not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};