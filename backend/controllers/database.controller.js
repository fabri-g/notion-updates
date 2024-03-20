// controllers/database.controller.js

const { queryDatabase, fetchDatabase } = require('./services/database.service');

async function getDatabase(req, res) {
    const databaseId = process.env.NOTION_DATABASE_ID;
    try {
        const response = await queryDatabase(databaseId);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
}

async function getSavedDatabase(req, res) {
    const { databaseId } = req.params; // Assuming you're using the databaseId as a URL parameter
    const { dateTime } = req.query; // Getting startTime and endTime from query parameters

    try {
        const responses = await fetchDatabase(databaseId, dateTime);
        res.json(responses);
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = { getDatabase, getSavedDatabase };
