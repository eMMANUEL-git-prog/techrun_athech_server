const express = require("express");
const router = express.Router();
const {
  fetchAthletes,
  addAthlete,
} = require("../controllers/athlete.controller");

// GET all athletes
router.get("/", fetchAthletes);

// POST new athlete
router.post("/", addAthlete);

module.exports = router;
