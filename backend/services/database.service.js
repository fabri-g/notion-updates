// services/database.service.js

const NotionResponse = require('../models/database.model');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

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

module.exports = { queryDatabase };
