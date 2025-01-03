import Content from "../model/Content.js";
import Course from "../model/Course.js";
import Module from "../model/Module.js";
import Lesson from "../model/Lesson.js";

// CREATE CONTENT

export const createContent = async (req, res) => {
    try {

        const { title, description, contentType, url, text, courseId, moduleId, lessonId } = req.body;

        const content = new Content({
            title,
            description,
            contentType,
            url,
            text,
            courseId,
            moduleId,
            lessonId,
        });

        await content.save();

        res.status(201).json(content);
        
    } catch (error) {

        res.status(409).json({ message: error.message });
        
    }
};

// GET ALL CONTENT

export const getAllContent = async (req, res) => {
    try {
        
        const content = await Content.find();

        res.status(200).json(content);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET CONTENT BY ID

export const getContentById = async (req, res) => {
    try {

        const { id } = req.params;

        const content = await Content.findById(id);

        res.status(200).json(content);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET CONTENT BY COURSE ID

export const getContentByCourseId = async (req, res) => {
    try {

        const courseId = req.params.id;

        // validate courseId
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const content = await Content.find({ courseId });

        res.status(200).json(content);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET CONTENT BY MODULE ID

export const getContentByModuleId = async (req, res) => {
    try {

        const moduleId = req.params.id;

        // validate moduleId
        const module = await Module.findById(moduleId);
        if(!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        const content = await Content.find({ moduleId });

        res.status(200).json(content);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// GET CONTENT BY LESSON ID

export const getContentByLessonId = async (req, res) => {
    try {

        const lessonId = req.params.id;

        // validate lessonId
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        const content = await Content.find({ lessonId });

        res.status(200).json(content);
        
    } catch (error) {

        res.status(404).json({ message: error.message });
        
    }
};

// UPDATE CONTENT

export const updateContent = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description, contentType, url, text, courseId, moduleId, lessonId } = req.body;

        const content = await Content.findById(id);

        if(!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        content.title = title;
        content.description = description;
        content.contentType = contentType;
        content.url = url;
        content.text = text;
        content.courseId = courseId;
        content.moduleId = moduleId;
        content.lessonId = lessonId;

        await content.save();

        res.status(200).json(content);
        
    } catch (error) {

        res.status(409).json({ message: error.message });
        
    }
};

// DELETE CONTENT

export const deleteContent = async (req, res) => {
    try {

        const { id } = req.params;

        const content = await Content.findById(id);

        if(!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        await content.deleteOne();

        res.status(200).json({ message: "Content deleted successfully" });
        
    } catch (error) {

        res.status(409).json({ message: error.message });
        
    }
};