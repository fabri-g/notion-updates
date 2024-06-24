// controllers/gpt.controller.js

const { generateProjectUpdateReport } = require('../../services/gpt.service');

async function getProjectUpdateReport(req, res) {
  const { oldSnapshot, newSnapshot } = req.body;
  try {
    const report = await generateProjectUpdateReport(oldSnapshot, newSnapshot);
    res.json({ report: report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProjectUpdateReport };
