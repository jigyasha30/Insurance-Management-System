const Claim = require("../models/Claim");

// ==========================
// Add Claim
// ==========================
const addClaim = async (req, res) => {
  try {
    const {
      customer,
      policy,
      claimAmount,
      reason,
      status,
      remarks,
    } = req.body;

    if (!customer || !policy || !claimAmount || !reason) {
      return res.status(400).json({
        success: false,
        message:
          "Customer, Policy, Claim Amount and Reason are required",
      });
    }

    const claim = await Claim.create({
      customer,
      policy,
      claimAmount,
      reason,
      status: status || "Pending",
      remarks: remarks || "",
    });

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Claims
// ==========================
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber policyType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Claim By ID
// ==========================
const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber policyType");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    res.status(200).json({
      success: true,
      claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Claim
// ==========================
const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    claim.customer = req.body.customer || claim.customer;
    claim.policy = req.body.policy || claim.policy;
    claim.claimAmount =
      req.body.claimAmount || claim.claimAmount;
    claim.reason = req.body.reason || claim.reason;
    claim.status = req.body.status || claim.status;
    claim.remarks =
      req.body.remarks !== undefined
        ? req.body.remarks
        : claim.remarks;

    if (
      req.body.status === "Approved" &&
      !claim.approvalDate
    ) {
      claim.approvalDate = new Date();
    }

    await claim.save();

    res.status(200).json({
      success: true,
      message: "Claim updated successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Claim
// ==========================
const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    await claim.deleteOne();

    res.status(200).json({
      success: true,
      message: "Claim deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
};