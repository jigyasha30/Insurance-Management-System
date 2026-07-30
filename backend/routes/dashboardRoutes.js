const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentClaims,
  getRecentPayments,
  getMonthlyCollection,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================
// Dashboard Statistics
// ==========================
router.get(
  "/stats",
  protect,
  authorizeRoles("admin", "agent"),
  getDashboardStats
);

// ==========================
// Recent Claims
// ==========================
router.get(
  "/recent-claims",
  protect,
  authorizeRoles("admin", "agent"),
  getRecentClaims
);

// ==========================
// Recent Payments
// ==========================
router.get(
  "/recent-payments",
  protect,
  authorizeRoles("admin", "agent"),
  getRecentPayments
);

// ==========================
// Monthly Premium Collection
// ==========================
router.get(
  "/monthly-collection",
  protect,
  authorizeRoles("admin", "agent"),
  getMonthlyCollection
);

module.exports = router;