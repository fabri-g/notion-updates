// models/database.model.js

const mongoose = require('mongoose');

const notionResponseSchema = new mongoose.Schema({
  databaseId: String,
  responseData: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotionResponse = mongoose.model('NotionResponse', notionResponseSchema);

module.exports = NotionResponse;
