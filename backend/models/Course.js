const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  admin: {type: mongoose.Schema.Types.ObjectId,ref: "FormData",  required: true}
});

const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;
