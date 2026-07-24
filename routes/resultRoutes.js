const express = require("express");

const router = express.Router();

const {
  generateResult,
  getResults,
  getStudentResult,
} = require("../controllers/resultController");

// Generate Result
router.post("/generate", generateResult);

// Get All Results
router.get("/", getResults);

router.get("/:studentId", getStudentResult);

module.exports = router;