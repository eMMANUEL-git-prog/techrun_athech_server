// services/aiService.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// Chat assistant
async function chatAssistantService(message) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });
  return res.text;
}

// Nutrition assistant
async function nutritionAssistantService(query, user = null) {
  const prompt = `You are a sports nutrition coach. User: ${
    user ? JSON.stringify(user) : "Anonymous"
  }. Question: ${query}`;
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return res.text;
}

// Training assistant
async function trainingAssistantService(query, user = null) {
  const prompt = `You are an elite athletics training coach. User: ${
    user ? JSON.stringify(user) : "Anonymous"
  }. Question: ${query}`;
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return res.text;
}

// Injury assistant
async function injuryAssistantService(query, user = null) {
  const prompt = `You are a sports physiotherapist AI. User: ${
    user ? JSON.stringify(user) : "Anonymous"
  }. Concern: ${query}. Give safe general guidance. Do NOT diagnose diseases.`;
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return res.text;
}

module.exports = {
  chatAssistantService,
  nutritionAssistantService,
  trainingAssistantService,
  injuryAssistantService,
};
