// routes/gpt.routes.js
const express = require('express');
const router = express.Router();
const { getProjectUpdateReport } = require('../controllers/gptController');

router.post("/analysis", getProjectUpdateReport);

module.exports = router;
