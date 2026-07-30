const Customer = require("../models/Customer");
const Policy = require("../models/Policy");
const Claim = require("../models/Claim");
const Payment = require("../models/Payment");

// ==========================
// Dashboard Statistics
// ==========================
const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();

    const totalPolicies = await Policy.countDocuments();

    const totalClaims = await Claim.countDocuments();

    const totalPayments = await Payment.countDocuments();

    const activePolicies = await Policy.countDocuments({
      status: "Active",
    });

    const pendingClaims = await Claim.countDocuments({
      status: "Pending",
    });

    // Total Revenue
    const totalPremiumCollection = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "Success",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // Recent Claims
    const recentClaims = await Claim.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber");

    // Recent Payments
    const recentPayments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber");

    res.status(200).json({
      success: true,

      dashboard: {
        totalCustomers,

        totalPolicies,

        activePolicies,

        totalClaims,

        pendingClaims,

        totalPayments,

        totalRevenue:
          totalPremiumCollection.length > 0
            ? totalPremiumCollection[0].totalAmount
            : 0,

        recentClaims,

        recentPayments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Recent Claims
// ==========================
const getRecentClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber");

    res.status(200).json({
      success: true,
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
// Recent Payments
// ==========================
const getRecentPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber");

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Monthly Premium Collection
// ==========================
const getMonthlyCollection = async (req, res) => {
  try {
    const collection = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "Success",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$paymentDate",
            },
            month: {
              $month: "$paymentDate",
            },
          },
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentClaims,
  getRecentPayments,
  getMonthlyCollection,
};