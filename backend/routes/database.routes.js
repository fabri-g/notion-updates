// routes/database.routes.js
const express = require('express');
const router = express.Router();
const { getDatabase, getSavedDatabase, getDatabasesTimestamps } = require('../controllers/database.controller');

router.post("/", getDatabase);
router.get("/by-id/:id", getSavedDatabase);
router.get("/timestamps", getDatabasesTimestamps);

module.exports = router;
