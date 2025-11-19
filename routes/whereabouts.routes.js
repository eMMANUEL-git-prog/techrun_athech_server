const express = require("express");
const router = express.Router();
const {
  fetchSubmissions,
  addSubmission,
  fetchUpdates,
  addUpdate,
  fetchVerifications,
  addVerification,
} = require("../controllers/whereabouts.controller");

// Submissions
router.get("/submissions", fetchSubmissions);
router.post("/submissions", addSubmission);

// Updates
router.get("/updates", fetchUpdates);
router.post("/updates", addUpdate);

// Verifications
router.get("/verifications", fetchVerifications);
router.post("/verifications", addVerification);

module.exports = router;
