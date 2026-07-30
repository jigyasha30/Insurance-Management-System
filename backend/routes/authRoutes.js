const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// Register
router.post(
  "/register",
  registerUser
);


// Login
router.post(
  "/login",
  loginUser
);


// Get Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// Update Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


module.exports = router;