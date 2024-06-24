// routes/index.js
const express = require('express');
const router = express.Router();

// Import modules
const databaseRoutes = require('./database.routes');
const gptRoutes = require('./gpt.routes');

// Use routes
router.use("/databases", databaseRoutes);
router.use("/gpt", gptRoutes);

module.exports = router;
