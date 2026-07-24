const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getStudentDashboard,
} = require("../controllers/dashboardController");

// ===================
// Admin Dashboard
// ===================
router.get("/", getDashboard);

// ===================
// Student Dashboard
// ===================
router.get("/student/:id", getStudentDashboard);

module.exports = router;