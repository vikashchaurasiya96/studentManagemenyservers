const Fee = require("../models/Fee");

// ===========================
// Save Fee
// ===========================

const saveFee = async (req, res) => {
  try {
    const {
      student,
      course,
      semester,
      totalFee,
      paidFee,
      paymentMode,
    } = req.body;

    const pendingFee = totalFee - paidFee;

    const status =
      pendingFee === 0 ? "Paid" : "Pending";

    const fee = await Fee.create({
      student,
      course,
      semester,
      totalFee,
      paidFee,
      pendingFee,
      paymentMode,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Fee Saved Successfully",
      data: fee,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ===========================
// Get All Fees
// ===========================

const getFees = async (req, res) => {

  try {

    const fees = await Fee.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: fees,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ===========================
// Update Fee
// ===========================

const updateFee = async (req, res) => {

  try {

    const {
      totalFee,
      paidFee,
    } = req.body;

    const pendingFee = totalFee - paidFee;

    const status =
      pendingFee === 0 ? "Paid" : "Pending";

    const fee = await Fee.findByIdAndUpdate(

      req.params.id,

      {
        ...req.body,
        pendingFee,
        status,
      },

      {
        new: true,
        runValidators: true,
      }

    ).populate("student");

    res.json({
      success: true,
      message: "Fee Updated Successfully",
      data: fee,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ===========================
// Delete Fee
// ===========================

const deleteFee = async (req, res) => {

  try {

    await Fee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Fee Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  saveFee,
  getFees,
  updateFee,
  deleteFee,
};