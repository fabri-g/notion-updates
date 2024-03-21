// controllers/database.controller.js

const { queryDatabase, fetchDatabase, fetchDatabasesTimestamps } = require('../services/database.service');

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
  const { id } = req.params;
  try {
    const databaseEntry = await fetchDatabase(id);
    if (databaseEntry) {
        res.json(databaseEntry);
    } else {
        res.status(404).json({ error: 'Database entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDatabasesTimestamps(req, res) {
  try {
    const timestamps = await fetchDatabasesTimestamps();
    res.json(timestamps);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = { getDatabase, getSavedDatabase, getDatabasesTimestamps };
