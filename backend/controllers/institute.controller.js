import Student from "../models/student.model.js";
import Course from "../models/Course.model.js";
import fs from "fs";
import crypto from "crypto";
import { uploadToIPFS } from "../utils/ipfsUpload.js";
import { storeHashOnSolana } from "../solana/storeHash.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import Institute from "../models/institute.model.js";



export async function signup(req, res) {
  try {
    const { name, email, password} = req.body;

    // Validation checks
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if email already exists
    const existingInstituteByEmail = await Institute.findOne({ email: email });
    if (existingInstituteByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user without the Image field
    const newInstitute = new Institute({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Generating token and setting cookie
    generateTokenAndSetCookie(Institute._id, res);

    // Saving the new user to the database
    await newInstitute.save();

    res.status(201).json({
      sucess: true,
      message: "Institute Account has been successfully created",
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" , error : error.message});
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Use lowercase variable name to avoid shadowing
    const institute = await Institute.findOne({ email: email });
    if (!institute) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, institute.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(institute._id, res);

    res.status(200).json({
      success: true,
      message: `Institute admin Logged in successfully ${token}`,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    // Clearing the authentication cookie
    res.clearCookie("token");
    res.status(200).json({
      sucess: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.Institute);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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


export const issueCertificate = async (req, res) => {
    console.log("req.file:", req.file);
console.log("req.body:", req.body);
  try {
    const {
      walletId,
      name, // course name
      studentName,
      startDate,
      endDate,
      issueDate,
      expiryDate
    } = req.body;

    console.log("Received data:", {
      walletId,
      name,
      studentName,
      startDate,
      endDate,
      issueDate,
      expiryDate
    });
    
    // Validate student exists by finding walletId
const student = await Student.findOne({ walletId });
if (!student) return res.status(404).json({ message: "Student not found" });


    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Hash the uploaded PDF
    const buffer = req.file.buffer;
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");

    // Upload file to IPFS (Pinata)
    const fileUrl = await uploadToIPFS(buffer, req.file.originalname);

    // Store hash on Solana blockchain
    const solanaTx = await storeHashOnSolana(hash);

    // Save certificate as a new course (or cert) document
    const course = await Course.create({
      name,
      description: `Certificate for ${studentName}`,
      degree: "", // optional, you can pass this if needed
      startDate,
      endDate,
      studentName,
      issueDate,
      expiryDate,
      studentWallet: walletId,
      fileUrl,
      hash,
      solanaTx,
      isShareable: false
    });

    res.status(200).json({ message: "Certificate issued successfully", course });
  } catch (error) {
    console.error("❌ Error issuing certificate:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
