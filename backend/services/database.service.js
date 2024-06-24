// services/database.service.js

const NotionResponse = require('../models/database.model');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function queryDatabase(databaseId) {
  try {
    const response = await notion.databases.query({ database_id: databaseId });

    // Save the response to the database
    const savedResponse = new NotionResponse({
      databaseId: databaseId,
      responseData: response,
    });
    await savedResponse.save();

    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchDatabase(id) {
  try {
      const response = await NotionResponse.findById(id);
      return response;
  } catch (error) {
      console.error("Error fetching the database entry:", error);
      throw error;
  }
}

async function fetchDatabasesTimestamps() {
  try {
    const allDatabases = await NotionResponse.find({}, 'createdAt').sort({createdAt: -1});
    return allDatabases.map(db => ({id: db._id, timestamp: db.createdAt}));
  } catch (error) {
    throw error;
  }
}

module.exports = { queryDatabase, fetchDatabase, fetchDatabasesTimestamps };
