import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Hospital from "../models/Hospital.model.js"
import User from "../models/User.model.js";


// import jwt from "jsonwebtoken";

// Middleware to verify token and extract hospital ID
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is in your .env file
    console.log("tokeeeeeee", decoded);
    req.hospitalId = decoded.userId;
     console.log("tokeeeeeee", req.hospitalId , decoded.userId); // Assuming 'id' is the payload field for hospital ID
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default verifyToken;
