import protectRoute from "../middlewares/protectRoute";

import express from "express";
import multer from "multer";
import protectRoute from "../middlewares/protectRoute.js";
import { getAllStudents, issueCertificate } from "../controllers/institute.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GET all students
router.get("/all", getAllStudents);

// POST issue certificate
router.post("/issue", protectRoute, upload.single("file"), issueCertificate);

export default router;
