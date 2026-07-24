const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const studentAuth = require("../middleware/authMiddleware");

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
  getMyProfile,
} = require("../controllers/studentController");

// Student Login
router.post("/login", studentLogin);


router.get("/profile", studentAuth, getMyProfile );



// Add Student
router.post("/add", upload.single("photo"), addStudent);


// Get All Students
router.get("/", getStudents);

// Get Student By ID
router.get("/:id", getStudentById);

// Update Student
router.put("/:id", upload.single("photo"), updateStudent );

router.delete("/:id", deleteStudent);

module.exports = router;