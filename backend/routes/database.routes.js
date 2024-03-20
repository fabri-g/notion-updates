// routes/database.routes.js
const express = require('express');
const router = express.Router();
const { getDatabase, getSavedDatabase } = require('../controllers/database.controller');

router.post("/", getDatabase);
router.get("/:databaseId", getSavedDatabase);

module.exports = router;
