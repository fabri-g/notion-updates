// services/gpt.service.js

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateProjectUpdateReport(oldSnapshot, newSnapshot) {
    const prompt = `Given the initial project status: ${JSON.stringify(oldSnapshot)} and the current project status: ${JSON.stringify(newSnapshot)}, provide a detailed comparison report highlighting tasks completed, any new tasks added, and the general progress of the project.`;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003", //GPT Model
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        return completion.data.choices[0].text;
    } catch (error) {
        console.error("Error in GPT service:", error);
        throw error;
    }
}

module.exports = { generateProjectUpdateReport };
