const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      default: null,
    },

    documentType: {
      type: String,
      enum: [
        "Aadhaar",
        "PAN",
        "Driving License",
        "Passport",
        "Policy Document",
        "Claim Document",
        "Other",
      ],
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    fileType: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", documentSchema);