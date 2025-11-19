// controllers/ai.controller.js
const {
  chatAssistantService,
  nutritionAssistantService,
  trainingAssistantService,
  injuryAssistantService,
} = require("../services/aiService");

// POST /api/ai/chat
const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await chatAssistantService(message);
    res.json({ reply });
  } catch (err) {
    console.error("chatAssistant error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};

// POST /api/ai/nutrition
const nutritionAssistant = async (req, res) => {
  try {
    const { query } = req.body;
    const reply = await nutritionAssistantService(query, req.user?.user);
    res.json({ reply });
  } catch (err) {
    console.error("nutritionAssistant error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};

// POST /api/ai/training
const trainingAssistant = async (req, res) => {
  try {
    const { query } = req.body;
    const reply = await trainingAssistantService(query, req.user?.user);
    res.json({ reply });
  } catch (err) {
    console.error("trainingAssistant error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};

// POST /api/ai/injury
const injuryAssistant = async (req, res) => {
  try {
    const { query } = req.body;
    const reply = await injuryAssistantService(query, req.user?.user);
    res.json({ reply });
  } catch (err) {
    console.error("injuryAssistant error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};

module.exports = {
  chatAssistant,
  nutritionAssistant,
  trainingAssistant,
  injuryAssistant,
};
