const express = require("express");
const router = express.Router();
const {
  fetchAlerts,
  addAlert,
  markAsRead,
} = require("../controllers/alerts.controller");

// GET alerts (optionally by user_id)
router.get("/", fetchAlerts);

// POST new alert
router.post("/", addAlert);

// PUT mark as read
router.put("/read", markAsRead);

module.exports = router;
