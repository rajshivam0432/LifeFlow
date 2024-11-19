


import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Hospital from "../models/Hospital.model.js"; // Correct import for Hospital
import Donor from "../models/Donor.model.js";
import mongoose from "mongoose";

const router = express.Router();



// Route for Donor registration
router.post("/register/donor", async (req, res) => {
  const { name, email, password, contact, city, pinCode, bloodType, gender, age } = req.body;

  // Basic validation for required fields
  if (!name || !email || !password || !contact || !city || !pinCode || !bloodType || !gender || !age) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Save the User document
    const user = new User({ name, email, password: hashedPassword, contact, city, pinCode, role: "Donor" });
    const savedUser = await user.save({ session });

    // Save the Donor document
    const donor = new Donor({
      userId: savedUser._id,
      bloodType,
      gender,
      age,
    });
    await donor.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Donor registered successfully", user: savedUser });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
    console.error("Error in Donor registration:", error);
    res.status(500).json({ message: "Error registering donor", error: error.stack });
  }
});

// Route for Hospital registration
router.post("/register/hospital", async (req, res) => {
  const {
    name,
    email,
    password,
    city,
    pinCode,
    address,
    licenseNumber,
  } = req.body;

  // Basic validation for required fields
  if (
    !name ||
    !email ||
    !password ||
    !city ||
    !pinCode ||
    !address ||
    !licenseNumber
  ) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    // Check if the hospital already exists by email
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the Hospital document with initial bloodUnits data
    const hospital = new Hospital({
      name,
      email,
      password: hashedPassword,
      city,
      pinCode,
      licenseNumber,
      address,
      bloodUnits: [
        {
          bloodType: "A+",
          unitsAvailable: 10,
          expirationDate: new Date("2024-12-01"),
        },
        {
          bloodType: "O-",
          unitsAvailable: 5,
          expirationDate: new Date("2024-11-25"),
        },
        {
          bloodType: "Ac+",
          unitsAvailable: 10,
          expirationDate: new Date("2024-12-01"),
        },
        {
          bloodType: "Od-",
          unitsAvailable: 5,
          expirationDate: new Date("2024-11-25"),
        },
        {
          bloodType: "AB+",
          unitsAvailable: 10,
          expirationDate: new Date("2024-12-01"),
        },
        {
          bloodType: "Oc-",
          unitsAvailable: 5,
          expirationDate: new Date("2024-11-25"),
        },
      ],
    });

    const savedHospital = await hospital.save();

    res.status(201).json({
      message: "Hospital registered successfully",
      hospital: savedHospital,
    });
  } catch (error) {
    console.error("Error in Hospital registration:", error);
    res
      .status(500)
      .json({ message: "Error registering hospital", error: error.stack });
  }
});

// Login Route (unchanged)
router.post("/login-donor", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Find the donor document and populate the userId field
    const donor = await Donor.findOne({ userId: user._id }).populate("userId");
    if (!donor) {
      return res.status(404).json({ message: "Donor details not found" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ msg: "logged in", token, donor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 // Adjust the path to match your directory structure

router.post("/login-hospital", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find hospital by email
    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hash
    const pass = await bcrypt.compare(password, hospital.password);
    if (!pass) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign({ userId: hospital._id }, process.env.JWT_SECRET, {
      expiresIn: "1000h",
    });

    // Respond with hospital data and token
    res.status(200).json({
      msg: "Logged in successfully",
      token,
      hospital: {
        id: hospital._id,
        name: hospital.name,
        email: hospital.email,
        contact: hospital.contact,
        address: hospital.address,
        city: hospital.city,
        pinCode: hospital.pinCode,
        licenseNumber: hospital.licenseNumber,
        bloodUnits: hospital.bloodUnits, // Include blood units
      },
    });
  } catch (error) {
    console.error("Error during hospital login:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});


export default router;





