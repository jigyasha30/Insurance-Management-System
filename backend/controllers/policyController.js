const Policy = require("../models/Policy");

// ==========================
// Add Policy
// ==========================
const addPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);

    res.status(201).json({
      success: true,
      message: "Policy added successfully",
      policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Policies
// ==========================
const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    res.status(200).json({
      success: true,
      count: policies.length,
      policies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Policy By ID
// ==========================
const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Policy
// ==========================
const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy updated successfully",
      policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Policy
// ==========================
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    await policy.deleteOne();

    res.status(200).json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
};