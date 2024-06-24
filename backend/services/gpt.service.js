// services/gpt.service.js
const { OpenAI } = require('openai');
const { preprocessForGPT } = require('../utils/process-json.utils');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateProjectUpdateReport(oldSnapshot, newSnapshot) {
  const oldSummary = preprocessForGPT(oldSnapshot);
  const newSummary = preprocessForGPT(newSnapshot);

  const prompt = `Given the initial project status: \n${oldSummary}\ and the current project status: \n${newSummary}\, provide a detailed comparison report highlighting tasks completed, any new tasks added, and the general progress of the project.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", //GPT Model
      messages: [{role: "user", content: prompt}],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in GPT service:", error);
    throw error;
  }
}

module.exports = { generateProjectUpdateReport };
