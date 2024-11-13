import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Hospital from "../models/Hospital.model.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();
// Route to get all hospitals
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    console.log(typeof hospitals);
    return res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single hospital by ID
router.get("/hospitals/me", verifyToken, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.hospitalId);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    return res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a blood request (for the authenticated hospital)
router.post("/hospitals/me/requestBlood", verifyToken, async (req, res) => {
  const { bloodType, quantity } = req.body;

  if (!bloodType || !quantity) {
    return res
      .status(400)
      .json({ message: "Blood type and quantity are required." });
  }

  try {
    // Find the hospital and update its pending requests
    const hospital = await Hospital.findById(req.hospitalId);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    const newRequest = {
      hospitalName: hospital.name,
      bloodType,
      quantity,
      status: "Pending",
    };

    hospital.pendingRequests = hospital.pendingRequests || [];
    hospital.pendingRequests.push(newRequest);
    await hospital.save();

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error submitting blood request:", error);
    res
      .status(500)
      .json({
        message: "Error submitting blood request",
        error: error.message,
      });
  }
});

// Route to add a new hospital
router.post("/hospitals", async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to add blood units to a hospital
router.post("/hospitals/:id/blood-units", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    const { bloodType, unitsAvailable, expirationDate } = req.body;
    const existingUnit = hospital.bloodUnits.find(
      (unit) => unit.bloodType === bloodType
    );

    if (existingUnit) {
      existingUnit.unitsAvailable += unitsAvailable;
    } else {
      hospital.bloodUnits.push({ bloodType, unitsAvailable, expirationDate });
    }

    await hospital.save();
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to handle blood donation
router.post("/hospitals/:id/donate", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    const { bloodType, units, donorName, age, gender } = req.body;
    const bloodUnit = hospital.bloodUnits.find(
      (unit) => unit.bloodType === bloodType
    );

    if (bloodUnit) {
      bloodUnit.unitsAvailable += units;
    } else {
      hospital.bloodUnits.push({
        bloodType,
        unitsAvailable: units,
        expirationDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ), // setting a default expiration date
      });
    }

    await hospital.save();
    res.status(200).json({ message: "Donation added", hospital });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
