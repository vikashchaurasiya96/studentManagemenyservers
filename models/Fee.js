const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    totalFee: {
      type: Number,
      required: true,
    },

    paidFee: {
      type: Number,
      required: true,
      default: 0,
    },

    pendingFee: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Net Banking"],
      default: "Cash",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fee", feeSchema);