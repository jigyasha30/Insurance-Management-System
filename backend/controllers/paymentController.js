const Payment = require("../models/Payment");

// ==========================
// Add Payment
// ==========================
const addPayment = async (req, res) => {
  try {
    const {
      customer,
      policy,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      dueDate,
    } = req.body;

    if (!customer || !policy || !amount || !paymentMethod || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (transactionId) {
      const existingPayment = await Payment.findOne({ transactionId });

      if (existingPayment) {
        return res.status(400).json({
          success: false,
          message: "Transaction ID already exists",
        });
      }
    }

    const payment = await Payment.create({
      customer,
      policy,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Payment added successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Payments
// ==========================
const getAllPayments = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const payments = await Payment.find({
      $or: [
        { transactionId: { $regex: keyword, $options: "i" } },
        { paymentStatus: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber policyType")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: payments.length,
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
// Get Payment By ID
// ==========================
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: "customer",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("policy", "policyNumber policyType")
      .lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Payment
// ==========================
const updatePayment = async (req, res) => {
  try {
    if (req.body.transactionId) {
      const existingPayment = await Payment.findOne({
        transactionId: req.body.transactionId,
        _id: { $ne: req.params.id },
      });

      if (existingPayment) {
        return res.status(400).json({
          success: false,
          message: "Transaction ID already exists",
        });
      }
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Payment
// ==========================
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await payment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};