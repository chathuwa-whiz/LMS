import Lesson from "../model/Lesson.js";
import Module from "../model/Module.js";

// CREATE MODULE

export const createModule = async (req, res) => {
    try {
        const { courseId, title, description } = req.body;

        const module = new Module({
            courseId,
            title,
            description,
        });

        await module.save();

        res.status(201).json(module);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET ALL MODULES

export const getAllModules = async (req, res) => {
    try {
        const modules = await Module.find();

        res.status(200).json(modules);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET MODULE BY ID

export const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findById(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json(module);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE MODULE

export const updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseId, title, description } = req.body;

        const module = await Module.findById(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        module.courseId = courseId;
        module.title = title;
        module.description = description;

        await module.save();

        res.status(200).json(module);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE MODULE WITH LESSONS

export const deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findById(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        await Lesson.deleteMany({ moduleId: id });
        
        await module.deleteOne();

        res.status(200).json({ message: "Module deleted with Lessons successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};