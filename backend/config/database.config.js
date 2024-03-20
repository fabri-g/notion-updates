// config/database.config.js
const mongoose = require('mongoose');

const databaseURL = process.env.MONGODB_URI;

const connectDatabase = async () => {
    try {
        await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Connection to the database failed', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;