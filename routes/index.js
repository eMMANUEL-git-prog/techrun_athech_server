const express = require("express");
const router = express.Router();

const athleteRoutes = require("./athlete.routes");
const authRoutes = require("./auth.routes");
const whereaboutsRoutes = require("./whereabouts.routes");
const alertsRoutes = require("./alerts.routes");
const coachRoutes = require("./coach.routes");
const medicRoutes = require("./medic.routes");
const nutritionistRoutes = require("./nutrition.routes");
const aiRoutes = require("./ai.routes");

// Register route groups
router.use("/auth", authRoutes);
router.use("/athletes", athleteRoutes);
router.use("/whereabouts", whereaboutsRoutes);
router.use("/alerts", alertsRoutes);
router.use("/coaches", coachRoutes);
router.use("/medics", medicRoutes);
router.use("/nutritionists", nutritionistRoutes);
router.use("/ai", aiRoutes);

module.exports = router;
