const express = require("express");

const router = express.Router();

const {

  saveMarks,

  getMarks,

  updateMarks,

  deleteMarks,

} = require("../controllers/marksController");


router.post("/", saveMarks);

router.get("/", getMarks);

router.put("/:id", updateMarks);

router.delete("/:id", deleteMarks);

module.exports = router;