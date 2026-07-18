const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
} = require("../controllers/studentController");

// Student Login
router.post("/login", studentLogin);

// Add Student
router.post("/add", upload.single("photo"), addStudent);

// Add Student
router.post("/add", upload.single("photo"), addStudent);

// Get All Students
router.get("/", getStudents);

// Get Student By ID
router.get("/:id", getStudentById);

// Update Student
router.put(
  "/:id",
  upload.single("photo"),
  updateStudent
);

router.delete("/:id", deleteStudent);

module.exports = router;