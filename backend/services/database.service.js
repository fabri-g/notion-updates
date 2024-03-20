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

async function fetchDatabase(databaseId, dateTime) {
    // dateTime is expected to be a JavaScript Date object or a string that can be converted to a Date object.
    const targetTime = new Date(dateTime);

    // Calculate start and end times for the 1-minute timeframe
    const startTime = new Date(targetTime.getTime() - 60000); // 1 minute before
    const endTime = new Date(targetTime.getTime() + 60000); // 1 minute after

    try {
        const query = {
            databaseId: databaseId,
            createdAt: {
                $gte: startTime,
                $lte: endTime,
            },
        };

        const responses = await NotionResponse.find(query);

        // Check if there are more than one databases
        if (responses.length === 1) {
            return responses[0];
        } else if (responses.length === 0) {
            throw new Error("No database found in the specified timeframe.");
        } else {
            throw new Error("Multiple databases found in the specified timeframe.");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { queryDatabase, fetchDatabase };
