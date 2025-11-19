const express = require("express");
const router = express.Router();
const {
  getAssignedAthletes,
  assignAthlete,
} = require("../controllers/medic.controller");

router.get("/", getAssignedAthletes);
router.post("/", assignAthlete);

module.exports = router;
