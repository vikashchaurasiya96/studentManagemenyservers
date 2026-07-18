const express = require("express");
const router = express.Router();

const {
  saveAttendance,
  getAttendance,
  getAttendanceByDate,
} = require("../controllers/attendanceController");

router.post("/", saveAttendance);
router.get("/", getAttendance);
router.get("/:date", getAttendanceByDate);

module.exports = router;