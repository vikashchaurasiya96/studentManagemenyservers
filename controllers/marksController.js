const Marks = require("../models/Marks");


// ==========================
// Save Marks
// ==========================

const saveMarks = async (req, res) => {

  try {

    const {
      student,
      course,
      semester,
      subject,
      examType,
      marks,
    } = req.body;

    const existing = await Marks.findOne({
      student,
      subject,
      examType,
    });

    if (existing) {

      existing.course = course;
      existing.semester = semester;
      existing.marks = marks;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Marks Updated Successfully",
        data: existing,
      });

    }

    const newMarks = await Marks.create({
      student,
      course,
      semester,
      subject,
      examType,
      marks,
    });

    res.status(201).json({
      success: true,
      message: "Marks Saved Successfully",
      data: newMarks,
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