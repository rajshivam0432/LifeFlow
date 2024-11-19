  import mongoose from "mongoose";

  const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    password: { type: String, required: true },
    bloodUnits: [
      {
        bloodType: { type: String, required: true },
        unitsAvailable: { type: Number, required: true },
        expirationDate: { type: Date, required: true },
      },
    ],
  });

  const Hospital = mongoose.model("Hospital", hospitalSchema);
  export default Hospital;
