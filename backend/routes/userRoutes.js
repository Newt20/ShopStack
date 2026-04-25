const express = require("express");
const router = express.Router();
const { registerUser, getUsers, loginUser } = require("../controllers/userController");

// Register new user
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

// ✅ Login route
router.post("/login", loginUser);

module.exports = router;

