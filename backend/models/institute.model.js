import mongoose from "mongoose";

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hashed password
  address: { type: String },
  contactNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Institute = mongoose.model("Institute", InstituteSchema);
export default Institute;
