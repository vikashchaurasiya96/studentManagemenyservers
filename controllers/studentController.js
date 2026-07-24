const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Add Student
// Add Student
const addStudent = async (req, res) => {
  try {

    const data = {
      ...req.body,
    };

    if (req.file) {
      data.photo = req.file.filename;
    }

    // Password Hash
data.password = await bcrypt.hash(data.password, 10);

    const student = await Student.create(data);

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      data: student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Student By ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Student
// Update Student
const updateStudent = async (req, res) => {
  try {

    const updateData = {
      ...req.body,
    };

    // Agar nayi photo upload hui hai
    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Student Own Profile

const getMyProfile = async (req,res)=>{

    try{

        const student = await Student.findById(req.student.id);

        if(!student){

            return res.status(404).json({
                success:false,
                message:"Student Not Found"
            });

        }

        res.status(200).json({

            success:true,
            data:student

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

const studentLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("Login Email:", email);

    const student = await Student.findOne({
      email: email.toLowerCase().trim(),
    });

    console.log("Student Found:", student);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: "Student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json({
      success: true,
      token,
      student: studentData,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
  getMyProfile,
};