import mongoose from "mongoose";

const DegreeSchema = new mongoose.Schema({
  degreeName: { type: String, required: true },
  startDate: { type: Date, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletId: { type: String, required: true, unique: true },
  image: { type: String },
  dept: { type: String },

  degrees: [DegreeSchema],
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
