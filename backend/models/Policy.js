const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    policyNumber: {
      type: String,
      required: [true, "Policy number is required"],
      unique: true,
      trim: true,
    },

    policyType: {
      type: String,
      enum: ["Health", "Life", "Vehicle", "Home", "Travel"],
      required: true,
    },

    premiumAmount: {
      type: Number,
      required: [true, "Premium amount is required"],
    },

    coverageAmount: {
      type: Number,
      required: [true, "Coverage amount is required"],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled"],
      default: "Active",
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Policy", policySchema);