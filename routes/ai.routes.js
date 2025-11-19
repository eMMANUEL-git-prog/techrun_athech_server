// routes/ai.routes.js
const express = require("express");
const {
  chatAssistant,
  nutritionAssistant,
  trainingAssistant,
  injuryAssistant,
} = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/chat", chatAssistant); // free chat, no auth
router.post("/nutrition", authMiddleware, nutritionAssistant);
router.post("/training", authMiddleware, trainingAssistant);
router.post("/injury", authMiddleware, injuryAssistant);

module.exports = router;
