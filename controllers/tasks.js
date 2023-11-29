const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createTask = async (req, res) => {

    const newTaskData = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        category: req.body.category,
        completed: req.body.completed
    };
    
    const { title, description, dueDate, priority, category, completed } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({ title, description, dueDate, priority, category, completed });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTask = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid Task ID' });
    }

    try {
        const updatedTaskData = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            category: req.body.category,
            completed: req.body.completed
        };

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask };
