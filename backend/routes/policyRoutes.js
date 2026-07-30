const express = require("express");
const router = express.Router();

const {
  addPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================
// Policy Routes
// ==========================

// Add Policy (Admin, Agent)
router.post(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  addPolicy
);

// Get All Policies (Admin, Agent)
router.get(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  getAllPolicies
);

// Get Policy By ID (Admin, Agent)
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  getPolicyById
);

// Update Policy (Admin, Agent)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  updatePolicy
);

// Delete Policy (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePolicy
);

module.exports = router;