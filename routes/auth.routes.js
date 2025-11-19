const express = require("express");
const { signUp, signIn, getMe } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", authMiddleware, getMe);

module.exports = router;
