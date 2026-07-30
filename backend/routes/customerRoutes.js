const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================
// Customer Routes
// ==========================

// Add Customer (Admin, Agent)
router.post(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  addCustomer
);

// Get All Customers (Admin, Agent)
router.get(
  "/",
  protect,
  authorizeRoles("admin", "agent"),
  getAllCustomers
);

// Get Customer By ID (Admin, Agent)
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  getCustomerById
);

// Update Customer (Admin, Agent)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "agent"),
  updateCustomer
);

// Delete Customer (Admin Only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCustomer
);

module.exports = router;