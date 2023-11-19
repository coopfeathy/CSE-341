const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    const tasks = await mongodb.getDb().collection('tasks').find();
    tasks.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingleTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const task = await mongodb
        .getDb()
        .collection('tasks')
        .find({ _id: taskId });
    task.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createTask = async (req, res) => {
    const newTask = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        creationDate: new Date(), // Set at the creation time
        lastUpdated: null, // Initially null
        category: req.body.category,
        completed: req.body.completed || false
    };
    const response = await mongodb.getDb().collection('tasks').insertOne(newTask);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while creating the task');
    }
};

const updateTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        lastUpdated: new Date(), // Update at modification time
        category: req.body.category,
        completed: req.body.completed
    };
    const response = await mongodb.getDb().collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while updating the task');
    }
};

const deleteTask = async (req, res) => {
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(404).json('Task not found');
    }
};

module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask };
