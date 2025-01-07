import Task from "../model/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {

        const { userId, scheduleId, title, description, priority, dueDate } = req.body;

        const task = new Task({ 
            userId, 
            scheduleId, 
            title, 
            description, 
            priority, 
            dueDate 
        });

        const savedTask = await task.save();
        
        res.status(201).json(savedTask);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// GET TASKS BY USER ID
export const getTasks = async (req, res) => {
    try {
        
        const userId = req.params;
        
        const tasks = await Task.find({ userId });
        
        res.status(200).json(tasks);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        
        const taskId = req.params;
        
        const newTask = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, isDeleted: false },
            newTask,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(200).json(updatedTask);
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {

        const taskId = req.params;

        const deletedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            { new: true }
        );

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(200).json({ message: "Task deleted successfully." });
    
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    
    }
};