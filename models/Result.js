const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
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

    totalMarks: {
      type: Number,
      required: true,
    },

    obtainedMarks: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    result: {
      type: String,
      enum: ["PASS", "FAIL"],
      default: "PASS",
    },

    examType: {
      type: String,
      enum: ["Mid Semester", "End Semester"],
      default: "Mid Semester",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);