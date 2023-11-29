const User = require('../models/userModel');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {

  const userData = {
    googleId: req.body.googleId,
    username: req.body.username,
    email: req.body.email
  };

    const { googleId, username, email } = req.body;

    if (!googleId || !username || !email) {
        return res.status(400).json({ message: 'Google ID, username, and email are required' });
    }

    const newUser = new User({ googleId, username, email });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    const userData = {
      googleId: req.body.googleId,
      username: req.body.username,
      email: req.body.email
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
