const Result = require("../models/Result");
const Marks = require("../models/Marks");

// =========================
// Generate Result
// =========================
const generateResult = async (req, res) => {
  try {

    const { student, examType } = req.body;

    const marks = await Marks.find({
      student,
      examType,
    });

    if (marks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Marks Found",
      });
    }

    const obtainedMarks = marks.reduce(
      (sum, item) => sum + item.marks,
      0
    );

    const totalMarks = marks.length * 100;

    const percentage = Number(
      ((obtainedMarks / totalMarks) * 100).toFixed(2)
    );

    let grade = "";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "F";

    const resultStatus =
      percentage >= 40 ? "PASS" : "FAIL";

    const result = await Result.findOneAndUpdate(
      {
        student,
        examType,
      },
      {
        student,
        course: marks[0].course,
        semester: marks[0].semester,
        obtainedMarks,
        totalMarks,
        percentage,
        grade,
        result: resultStatus,
        examType,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Result Generated Successfully",
      data: result,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// =========================
// Get Results
// =========================

const getResults = async (req, res) => {

  try {

    const results = await Result.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: results,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

const getStudentResult = async (req, res) => {

  try {

    const result = await Result.findOne({
      student: req.params.studentId,
    }).populate("student");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    const marks = await Marks.find({
      student: req.params.studentId,
      examType: result.examType,
    });

    res.json({
      student: result.student,
      marks,
      total: result.obtainedMarks,
      percentage: result.percentage,
      grade: result.grade,
      result: result.result,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  generateResult,
  getResults,
  getStudentResult,
};