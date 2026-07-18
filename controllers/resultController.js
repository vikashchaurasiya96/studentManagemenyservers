const Marks = require("../models/Marks");

const getStudentResult = async (req, res) => {

  try {

    const marks = await Marks.find({
      student: req.params.studentId,
    }).populate("student");

    let total = 0;

    marks.forEach(item => {
      total += item.marks;
    });

    const percentage =
      marks.length > 0
        ? (total / marks.length).toFixed(2)
        : 0;

    let grade = "F";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 40) grade = "D";

    res.json({
      success: true,
      student: marks[0]?.student,
      marks,
      total,
      percentage,
      grade,
      result:
        percentage >= 40
          ? "PASS"
          : "FAIL",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  getStudentResult,
};