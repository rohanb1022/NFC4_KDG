import Student from "../models/student.model.js";
import Course from "../models/Course.model.js";
import fs from "fs";
import crypto from "crypto";
import { uploadToIPFS } from "../utils/ipfsUpload.js";
import { storeHashOnSolana } from "../solana/storeHash.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import Institute from "../models/institute.model.js";
import { chunkAndStorePDF } from "../utils/chunkAndStorePDF.js";


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
  try {
    const {
      walletId,
      name, // course name
      studentName,
      startDate,
      degree,
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
      degree,
      issueDate,
      expiryDate
    });

    // ✅ Validate student exists
    const student = await Student.findOne({ walletId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const studentEmail = student.email; 
    console.log("Student email:", studentEmail);

    // ✅ Validate uploaded file
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Step 1: Chunk + store in vector DB
    console.log("🔄 Starting PDF chunking...");
    const { chunkTexts, collectionName, totalChunks, chunks } = await chunkAndStorePDF(
      req.file.buffer,
      walletId
    );
    
    console.log("✅ PDF chunks created:");
    //console.log(`📊 Collection Name: ${collectionName}`);
    //console.log(`📊 Total Chunks: ${totalChunks}`);
    //console.log(`📊 Chunk Texts:`, chunkTexts);
    console.log(`📊 Original Chunks:`, chunks);

    // ✅ Step 2: send data chunks to n8n for processing
    console.log("🔄 Sending chunks to n8n for processing...");
    try {
      const n8nResponse = await fetch("https://pakhu.app.n8n.cloud/webhook-test/c1a41643-5068-41d9-9ac4-f3aaa3016ac3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chunks: chunkTexts,
          studentemail: studentEmail
        })
      });

      const n8nResult = await n8nResponse.json();
      console.log("📊 n8n Response:", n8nResult);

      if (n8nResult.response==='false') {
        return res.status(400).json({ 
          message: "Certificate validation failed,an email has been sent to your email address", 
          
        });
      }

      console.log("✅ n8n processing successful, continuing with certificate issuance...");
    } catch (n8nError) {
      console.error("❌ Error calling n8n webhook:", n8nError);
      return res.status(500).json({ 
        message: "Failed to validate certificate with n8n", 
        error: n8nError.message 
      });
    }

    // ✅ Hash the uploaded PDF
    const buffer = req.file.buffer;
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");

    // ✅ Upload file to IPFS
    const fileUrl = await uploadToIPFS(buffer, req.file.originalname);

    // ✅ Store hash on Solana
    const { tx, certAccount } = await storeHashOnSolana(hash, name, walletId);

    // ✅ Save to MongoDB
    const course = await Course.create({
      name,
      description: `Certificate for ${studentName}`,
      degree,
      startDate,
      endDate,
      studentName,
      issueDate,
      expiryDate,
      studentWallet: walletId,
      fileUrl,
      hash,
      solanaTx: tx,
      solanaCertAddress: certAccount,
      isShareable: false
    });

    res.status(200).json({
      message: "Certificate issued successfully",
      course
    });
  } catch (error) {
    console.error("❌ Error issuing certificate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentByWallet = async (req, res) => {
  const { walletId } = req.params;
  try {
    const student = await Student.findOne({ walletId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      name: student.name,
      walletId: student.walletId,
    });
  } catch (error) {
    console.error("❌ Error fetching student by walletId:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const bulkUploadCertificates = async (req, res) => {
  try {
    const { certificates } = req.body; // Array of certificate data
    const files = req.files; // Array of uploaded files

    if (!certificates || !Array.isArray(certificates) || certificates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No certificates data provided" 
      });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No files uploaded" 
      });
    }

    if (certificates.length !== files.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Number of certificates and files must match" 
      });
    }

    const results = [];
    const errors = [];

    // Process each certificate
    for (let i = 0; i < certificates.length; i++) {
      try {
        const certificateData = certificates[i];
        const file = files[i];

        const {
          walletId,
          name, // course name
          studentName,
          startDate,
          degree,
          endDate,
          issueDate,
          expiryDate
        } = certificateData;

        console.log(`Processing certificate ${i + 1}/${certificates.length} for wallet: ${walletId}`);

        // Validate student exists
        const student = await Student.findOne({ walletId });
        if (!student) {
          errors.push({
            index: i,
            walletId,
            error: "Student not found"
          });
          continue;
        }

        // Validate file
        if (!file || !file.buffer) {
          errors.push({
            index: i,
            walletId,
            error: "No file uploaded"
          });
          continue;
        }

        // Step 1: Chunk + store in vector DB
        console.log(`🔄 Starting PDF chunking for ${walletId}...`);
        const { chunkTexts, collectionName, totalChunks, chunks } = await chunkAndStorePDF(
          file.buffer,
          walletId
        );
        
        console.log(`✅ PDF chunks created for ${walletId}:`, chunks.length);

        // Step 2: Hash the uploaded PDF
        const buffer = file.buffer;
        const hash = crypto.createHash("sha256").update(buffer).digest("hex");

        // Step 3: Upload file to IPFS
        const fileUrl = await uploadToIPFS(buffer, file.originalname);

        // Step 4: Store hash on Solana
        const { tx, certAccount } = await storeHashOnSolana(hash, name, walletId);

        // Step 5: Save to MongoDB
        const course = await Course.create({
          name,
          description: `Certificate for ${studentName}`,
          degree,
          startDate,
          endDate,
          studentName,
          issueDate,
          expiryDate,
          studentWallet: walletId,
          fileUrl,
          hash,
          solanaTx: tx,
          solanaCertAddress: certAccount,
          isShareable: false
        });

        results.push({
          index: i,
          walletId,
          success: true,
          course
        });

        console.log(`✅ Certificate issued successfully for ${walletId}`);

      } catch (error) {
        console.error(`❌ Error processing certificate ${i + 1}:`, error);
        errors.push({
          index: i,
          walletId: certificates[i]?.walletId || 'unknown',
          error: error.message
        });
      }
    }

    // Return results
    res.status(200).json({
      success: true,
      message: `Bulk upload completed. ${results.length} successful, ${errors.length} failed`,
      results,
      errors,
      summary: {
        total: certificates.length,
        successful: results.length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error("❌ Error in bulk upload:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
};

