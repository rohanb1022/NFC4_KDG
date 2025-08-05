import Student from "../models/student.model.js";
import Course from "../models/Course.model.js";
import Institute from "../models/institute.model.js";
import fs from "fs";
import crypto from "crypto";
import { uploadToIPFS } from "../utils/uploadToIPFS.js";
import { storeHashOnSolana } from "../solana/storeHash.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";



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
    await Institute.save();

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

    // Validation checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find Institute by email
    const Institute = await Institute.findOne({ email: email });
    if (!Institute) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password match
    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generating token and setting cookie
    generateTokenAndSetCookie(Institute._id, res);

    res.status(200).json({
      sucess: true,
      message: "Institute admin Logged in successfully",
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

    const cert = await Course.create({
      studentWallet: wallet,
      name: student.name,
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
