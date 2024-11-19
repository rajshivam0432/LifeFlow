import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodType: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  lastDonationDate: { type: Date, required: true },
});

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
