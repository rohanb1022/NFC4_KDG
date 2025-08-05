import { hash } from "bcrypt";
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
  fileUrl: { type: String },
  hash: { type: String },
  SolaxaTx: { type: String },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
