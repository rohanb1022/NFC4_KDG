import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import Student from "../models/student.model.js";

export async function signup(req, res) {
  try {
    const { name, email, password,walletId} = req.body;

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
    const existingStudentByEmail = await Student.findOne({ email: email });
    if (existingStudentByEmail) {
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
    const newStudent = new Student({
      name: name,
      email: email,
      password: hashedPassword,
      walletId: walletId,
    });

    // Generating token and setting cookie
    generateTokenAndSetCookie(newStudent._id, res);

    // Saving the new user to the database
    await newStudent.save();

    res.status(201).json({
      sucess: true,
      message: "Account has been successfully created",
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

    // Find user by email
    const student = await Student.findOne({ email: email });
    if (!student) {
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
    generateTokenAndSetCookie(student._id, res);

    res.status(200).json({
      sucess: true,
      message: "Logged in successfully",
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
    res.status(200).json(req.student);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};