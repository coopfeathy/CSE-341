const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    // Add other fields as necessary, like profile picture URL, etc.
});

module.exports = mongoose.model('User', userSchema);