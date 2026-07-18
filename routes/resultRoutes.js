const express = require("express");
const router = express.Router();

const {
  getStudentResult,
} = require("../controllers/resultController");

router.get("/:studentId", getStudentResult);

module.exports = router;