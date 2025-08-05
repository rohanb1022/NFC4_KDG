import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

// website routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Allow requests only from frontend
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Its working!!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Server is working on http://localhost:${PORT}`);
});
