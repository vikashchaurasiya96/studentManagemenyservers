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

const getStudentDashboard = async (req, res) => {
  try {

    const studentId = req.params.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // Attendance
    const totalAttendance = await Attendance.countDocuments({
      student: studentId,
    });

    const presentAttendance = await Attendance.countDocuments({
      student: studentId,
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : ((presentAttendance / totalAttendance) * 100).toFixed(2);

    // Marks
    const marks = await Marks.find({
      student: studentId,
    });

    let averageMarks = 0;

    if (marks.length > 0) {

      averageMarks = (
        marks.reduce((sum, item) => sum + item.marks, 0) /
        marks.length
      ).toFixed(2);

    }

   res.json({
  success: true,
  attendance: attendancePercentage,
  averageMarks,
  result: averageMarks >= 33 ? "PASS" : "FAIL",
  fees: "Pending",
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
  getStudentDashboard,
};