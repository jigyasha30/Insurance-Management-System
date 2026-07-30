const express = require("express");
const router = express.Router();

const {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================
// Payment Routes
// ==========================

// Add Payment (Admin, Agent)
router.post(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  addPayment
);

// Get All Payments (Admin, Agent)
router.get(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  getAllPayments
);

// Get Payment By ID (Admin, Agent, Customer)
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "agent", "customer"),
  getPaymentById
);

// Update Payment (Admin, Agent)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  updatePayment
);

// Delete Payment (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePayment
);

module.exports = router;