import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/student.model.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    const student = await Student.findById(decoded.id).select("-password");
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.student = student;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default protectRoute;
