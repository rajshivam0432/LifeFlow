import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String,required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  pinCode: { type: String, required: true },
  age: { type: String },
  gender: { type: String },
  status:{type:String}
});

const User = mongoose.model("User", userSchema);
export default User;
