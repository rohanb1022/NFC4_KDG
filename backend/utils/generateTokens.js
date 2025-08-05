import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return token;
};

export default generateTokenAndSetCookie;
