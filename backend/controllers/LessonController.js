import Lesson from "../model/Lesson";

// CREATE LESSON

export const createLesson = async (req, res) => {
    try {
        const { moduleId, title, description, contentType, content, duration } = req.body;

        const lesson = new Lesson({
            moduleId,
            title,
            description,
            contentType,
            content,
            duration,
        });

        await lesson.save();

        res.status(201).json(lesson);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET ALL LESSONS

export const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();

        res.status(200).json(lessons);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET LESSON BY ID

export const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;

        const lesson = await Lesson.findById(id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json(lesson);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE LESSON

export const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { moduleId, title, description, contentType, content, duration } = req.body;

        const lesson = await Lesson.findById(id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        lesson.moduleId = moduleId;
        lesson.title = title;
        lesson.description = description;
        lesson.contentType = contentType;
        lesson.content = content;
        lesson.duration = duration;

        await lesson.save();

        res.status(200).json(lesson);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE LESSON

export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;

        const lesson = await Lesson.findById(id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        await lesson.delete();

        res.status(200).json({ message: "Lesson deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};