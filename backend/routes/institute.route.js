
import express from "express";
import multer from "multer";
import protectRoute from "../middlewares/protectRoute.js";
import { getAllStudents, issueCertificate } from "../controllers/institute.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  res.send("This is a Instructor Route");
});

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/authUser" ,checkAuth);

// GET all students
router.get("/all", getAllStudents);

// POST issue certificate
router.post("/issue", protectRoute, upload.single("file"), issueCertificate);

export default router;
