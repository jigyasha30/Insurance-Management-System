const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer is required"],
    },

    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: [true, "Policy is required"],
    },

    claimAmount: {
      type: Number,
      required: [true, "Claim amount is required"],
      min: [1, "Claim amount must be greater than 0"],
    },

    reason: {
      type: String,
      required: [true, "Claim reason is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    submissionDate: {
      type: Date,
      default: Date.now,
    },

    approvalDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically set approvalDate when claim is approved
claimSchema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "Approved" &&
    !this.approvalDate
  ) {
    this.approvalDate = new Date();
  }

  if (
    this.isModified("status") &&
    this.status !== "Approved"
  ) {
    this.approvalDate = null;
  }

  next();
});

module.exports = mongoose.model("Claim", claimSchema);