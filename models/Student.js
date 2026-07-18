const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
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

    address: {
      type: String,
      required: true,
    },

    photo: {
    type: String,
    default: "",
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Student",
    },

    isActive: {
      type: Boolean,
      default: true,
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);