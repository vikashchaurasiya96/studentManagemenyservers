const express = require("express");

const router = express.Router();

const {

  saveAttendance,

  getAttendance,

  getAttendanceByDate,

  getStudentAttendance,

  getAttendancePercentage,

} = require("../controllers/attendanceController");

// =====================
// Admin Routes
// =====================

// Save Attendance
router.post("/", saveAttendance);

// Get All Attendance
router.get("/", getAttendance);

// Get Attendance By Date
router.get("/date/:date", getAttendanceByDate);

// =====================
// Student Routes
// =====================

// Student Attendance
router.get("/student/:studentId", getStudentAttendance);

// Attendance Percentage
router.get(
  "/percentage/:studentId",
  getAttendancePercentage
);

module.exports = router;