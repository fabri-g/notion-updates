// database.service.js

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });

async function queryDatabase(databaseId) {
    try {
        const response = await notion.databases.query({ database_id: databaseId });
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = { queryDatabase };
