const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");

// ==========================
// Add Teacher
// ==========================
const addTeacher = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      department,
      subject,
      qualification,
      experience,
      salary,
      joiningDate,
      address,
      password,
    } = req.body;

    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      fullName,
      email,
      phone,
      gender,
      department,
      subject,
      qualification,
      experience,
      salary,
      joiningDate,
      address,
      password: hashedPassword,
      photo: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Teacher Added Successfully",
      data: teacher,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// Get All Teachers
// ==========================
const getTeachers = async (req, res) => {

  try {

    const teachers = await Teacher.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: teachers.length,
      data: teachers,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ==========================
// Get Teacher By Id
// ==========================
const getTeacherById = async (req, res) => {

  try {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {

      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });

    }

    res.json({
      success: true,
      data: teacher,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ==========================
// Update Teacher
// ==========================
// ==========================
// Update Teacher
// ==========================
const updateTeacher = async (req, res) => {

  try {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    teacher.fullName = req.body.fullName;
    teacher.email = req.body.email;
    teacher.phone = req.body.phone;
    teacher.gender = req.body.gender;
    teacher.department = req.body.department;
    teacher.subject = req.body.subject;
    teacher.qualification = req.body.qualification;
    teacher.experience = req.body.experience;
    teacher.salary = req.body.salary;
    teacher.joiningDate = req.body.joiningDate;
    teacher.address = req.body.address;

    // Update Photo
    if (req.file) {
      teacher.photo = req.file.filename;
    }

    // Update Password Only If Entered
    if (req.body.password && req.body.password !== "") {
      teacher.password = await bcrypt.hash(req.body.password, 10);
    }

    await teacher.save();

    res.json({
      success: true,
      message: "Teacher Updated Successfully",
      data: teacher,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ==========================
// Delete Teacher
// ==========================
const deleteTeacher = async (req, res) => {

  try {

    await Teacher.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Teacher Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};