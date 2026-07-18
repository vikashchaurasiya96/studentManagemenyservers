const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },

    subject:{
        type:String,
        required:true
    },

    marks:{
        type:Number,
        required:true
    },

    examType:{
        type:String,
        enum:["Mid Semester","End Semester"],
        default:"Mid Semester"
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Marks",marksSchema);