const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const initDb = (callback) => {
    if (mongoose.connection.readyState) {
        console.log('Database is already initialized');
        return callback(null);
    }
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        callback(null);
    })
    .catch(err => {
        console.error("Could not connect to MongoDB:", err);
        callback(err);
    });
};

module.exports = { initDb };
