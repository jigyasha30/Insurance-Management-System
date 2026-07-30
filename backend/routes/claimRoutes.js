const express = require("express");
const router = express.Router();

const {
  addClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================
// Claim Routes
// ==========================

// Add Claim (Customer, Admin, Agent)
router.post(
  "/",
  protect,
  authorizeRoles("customer", "admin", "agent"),
  addClaim
);

// Get All Claims (Admin, Agent)
router.get(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  getAllClaims
);

// Get Claim By ID (Admin, Agent, Customer)
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "agent", "customer"),
  getClaimById
);

// Update Claim (Admin, Agent)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  updateClaim
);

// Delete Claim (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteClaim
);

module.exports = router;