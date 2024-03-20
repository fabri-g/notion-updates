// controllers/database.controller.js

const { queryDatabase } = require('./services/database.service');

async function getDatabase(req, res) {
    const databaseId = process.env.NOTION_DATABASE_ID;
    try {
        const response = await queryDatabase(databaseId);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = { getDatabase };
