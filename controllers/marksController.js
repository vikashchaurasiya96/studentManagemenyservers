const Marks = require("../models/Marks");


// ==========================
// Save Marks
// ==========================

const saveMarks = async (req, res) => {
  try {

    const marks = await Marks.create(req.body);

    res.status(201).json({
      success: true,
      data: marks,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


// ==========================
// Get All Marks
// ==========================

const getMarks = async (req, res) => {
  try {

    const marks = await Marks.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: marks,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


// ==========================
// Update Marks
// ==========================

const updateMarks = async (req, res) => {

  try {

    const updated = await Marks.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      }

    ).populate("student");

    res.json({

      success: true,
      message: "Marks Updated Successfully",

      data: updated,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};


// ==========================
// Delete Marks
// ==========================

const deleteMarks = async (req, res) => {

  try {

    await Marks.findByIdAndDelete(req.params.id);

    res.json({

      success: true,

      message: "Marks Deleted Successfully",

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};



module.exports = {

  saveMarks,

  getMarks,

  updateMarks,

  deleteMarks,

};