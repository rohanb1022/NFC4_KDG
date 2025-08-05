import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  degree: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isShareable: { type: Boolean, default: false },
  shareWindow: {
    from: { type: Date },
    to: { type: Date },
  },
  link: { type: String },
  studentWallet: { type: String, required: true }, 
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
