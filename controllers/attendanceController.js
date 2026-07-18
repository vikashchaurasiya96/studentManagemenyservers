const Attendance = require("../models/Attendance");

const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saveAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    for (const item of attendance) {
      await Attendance.findOneAndUpdate(
        {
          student: item._id,
          date: new Date(date),
        },
        {
          student: item._id,
          date: new Date(date),
          status: item.status,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Attendance Saved Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.find().populate("student");

    res.json({
      success: true,
      data: attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAttendanceByDate = async (req, res) => {
  try {

    const attendance = await Attendance.find({
      date: new Date(req.params.date),
    }).populate("student");

    res.json({
      success: true,
      data: attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  saveAttendance,
  getAttendance,
  getAttendanceByDate,
};