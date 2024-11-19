import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Hospital from "../models/Hospital.model.js"
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

// import jwt from "jsonwebtoken";

// Middleware to verify token and extract hospital ID
 const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No Authorization header found");
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    req.hospitalId = decoded.userId; // Assuming 'userId' is the correct field name
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};


export default verifyToken;
