import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Add your Protected User Routes here...

router.get("/", protectRoute, (req, res) => {
  res.send("This is a User Route");
});

export default router;
