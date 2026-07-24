const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

// Add Teacher
router.post(
  "/",
  upload.single("photo"),
  addTeacher
);

// Get All Teachers
router.get("/", getTeachers);

// Get Teacher By Id
router.get("/:id", getTeacherById);

// Update Teacher
router.put(
  "/:id",
  upload.single("photo"),
  updateTeacher
);

// Delete Teacher
router.delete("/:id", deleteTeacher);

module.exports = router;