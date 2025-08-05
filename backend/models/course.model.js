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

  studentName: { type: String, required: true },
  studentWallet: { type: String, required: true }, 

  fileUrl: { type: String },
  hash: { type: String },
  solanaTx: { type: String }, // fixed typo from SolaxaTx
  issueDate: { type: Date },
  expiryDate: { type: Date },
});

// ✅ Prevent OverwriteModelError
const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default Course;
