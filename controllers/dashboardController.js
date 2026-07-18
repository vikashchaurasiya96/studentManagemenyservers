const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");

const getDashboard = async (req, res) => {
  try {

    const totalStudents = await Student.countDocuments();

    const totalAttendance = await Attendance.countDocuments();

    const presentToday = await Attendance.countDocuments({
      status: "Present",
    });

    const absentToday = await Attendance.countDocuments({
      status: "Absent",
    });

    const leaveToday = await Attendance.countDocuments({
      status: "Leave",
    });

    const marks = await Marks.find();

    let averageMarks = 0;

    if (marks.length > 0) {
      averageMarks =
        (
          marks.reduce((sum, item) => sum + item.marks, 0) /
          marks.length
        ).toFixed(2);
    }

    res.json({
      success: true,
      totalStudents,
      totalAttendance,
      presentToday,
      absentToday,
      leaveToday,
      averageMarks,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getDashboard,
};