import express from "express";
import { login, logout, signup , checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/authUser" ,  checkAuth);
export default router;
