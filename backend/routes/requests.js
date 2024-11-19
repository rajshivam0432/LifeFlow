import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Donor from "../models/Donor.model.js";
import Hospital from "../models/Hospital.model.js";
import verifyToken from "../middlewares/auth.js";
import sendBloodRequestToDonor from "../utils/sendMail.js"; // Your existing mail function
// import { sendSmsToDonor } from "../utils/sendSmsToDonor.js"; // Import send SMS function

const router = express.Router();

// Route to get all hospitals
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
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

// Route to request blood (includes sending SMS and email to donors)
router.post("/hospitals/me/requestBlood", verifyToken, async (req, res) => {
  try {
    const { bloodType, quantity, address, updateAddress } = req.body;

    if (!bloodType || !quantity) {
      return res.status(400).json({ message: "Blood type and quantity are required." });
    }

    // Fetch hospital details
    const hospital = await Hospital.findById(req.hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    // Update hospital address if needed
    if (updateAddress && address) {
      hospital.address = address;
      await hospital.save();
    }

    // Notify donors via email and SMS
    const donors = await Donor.find({ bloodType }).populate("userId", "email name contact");
    if (donors.length > 0) {
      for (const donor of donors) {
        console.log("Checking donor:", donor.name);

        // Check if contact exists
        if (donor.userId.contact) { // Ensure contact is from the userId population
          console.log("Donor contact:", donor.userId.contact);
          const message = `Dear ${donor.name}, a request has been made for ${quantity} units of ${bloodType} blood at ${hospital.name}. Please consider donating.`;
         

          // Send email to donor (existing function)
          await sendBloodRequestToDonor(
            donor,
            bloodType,
            quantity,
            hospital.name
          );
        }
      }
    }0
    res.status(200).json({ message: "Blood request submitted successfully." });
  } catch (error) {
    console.error("Error submitting blood request:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
});


// Route to update blood units in a hospital
router.patch("/hospitals/:hospitalId/updateBloodUnits", async (req, res) => {
  const id = req.params.hospitalId;
  const { bloodUnits } = req.body;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.bloodUnits = bloodUnits;
    await hospital.save();
    res.status(200).json(hospital);
  } catch (error) {
    console.error("Error updating hospital:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
