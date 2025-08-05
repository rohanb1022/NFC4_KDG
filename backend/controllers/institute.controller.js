import Student from "../models/student.model.js";
import Certificate from "../models/certificate.model.js";
import fs from "fs";
import crypto from "crypto";
import { uploadToIPFS } from "../utils/ipfsUpload.js";
import { storeHashOnSolana } from "../solana/storeHash.js";

// @desc   Get all registered students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Issue certificate to a student
export const issueCertificate = async (req, res) => {
  try {
    const { wallet } = req.body;
    const student = await Student.findOne({ wallet });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const buffer = fs.readFileSync(req.file.path);
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const fileUrl = await uploadToIPFS(req.file.path);
    const solanaTx = await storeHashOnSolana(hash);

    const cert = await Certificate.create({
      studentWallet: wallet,
      name: student.name,
      course: student.courses.join(", "),
      degree: student.degree,
      department: student.department,
      issueDate: student.startDate,
      expiryDate: student.endDate,
      fileUrl,
      hash,
      solanaTx,
    });

    res.json(cert);
  } catch (err) {
    console.error("❌ Error issuing certificate:", err);
    res.status(500).json({ message: "Server error while issuing certificate" });
  }
};
