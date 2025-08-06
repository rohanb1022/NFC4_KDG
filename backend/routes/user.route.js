import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import Course from "../models/Course.model.js";
import { login, logout, signup , checkAuth } from "../controllers/student.controller.js";
import crypto from "crypto";

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.send("This is a User Route");
});

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/authUser" ,checkAuth);

// Get all courses by walletId
router.get("/get-all/:walletId",protectRoute, async (req, res) => {
  const { walletId } = req.params;
  try {
    const certs = await Course.find({ studentWallet: walletId });
    res.json(certs);
    console.log(certs)
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Share course
router.post("/share/:courseId", protectRoute, async (req, res) => {
  const { courseId } = req.params;
  const expiresIn = req.body.expiresIn || 24 * 60 * 60 * 1000; // default 24h

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const randomHash = crypto.randomBytes(6).toString("hex");
    const now = new Date();
    const expiry = new Date(now.getTime() + expiresIn);

    course.isShareable = true;
    course.shareWindow = { from: now, to: expiry };
    course.link = randomHash
    await course.save();

    res.status(200).json({ message: "Course shared", link: course.link });
  } catch (error) {
    res.status(500).json({ message: "Error sharing course" });
  }
});

// Revoke course access
router.post("/revoke/:courseId", protectRoute, async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.isShareable = false;
    course.shareWindow = { from: null, to: null };
    course.link = null;
    await course.save();

    res.status(200).json({ message: "Course sharing revoked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error revoking course sharing" });
  }
});


export default router;
