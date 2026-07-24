const express = require("express");

const router = express.Router();

const {
  saveFee,
  getFees,
  updateFee,
  deleteFee,
} = require("../controllers/feeController");

// Save Fee
router.post("/", saveFee);

// Get All Fees
router.get("/", getFees);

// Update Fee
router.put("/:id", updateFee);

// Delete Fee
router.delete("/:id", deleteFee);

module.exports = router;