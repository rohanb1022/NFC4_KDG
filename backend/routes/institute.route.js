
import express from "express";
import multer from "multer";
import protectRoute from "../middlewares/protectRoute.js";
import { checkAuth,getStudentByWallet, getAllStudents, issueCertificate, login, logout, signup } from "../controllers/institute.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("This is a Instructor Route");
});

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/authUser" ,checkAuth);

// GET all students
router.get("/all", getAllStudents);
router.get("/student/:walletId", getStudentByWallet); 
// POST issue certificate
router.post("/issue", upload.single("file"), issueCertificate);

export default router;
