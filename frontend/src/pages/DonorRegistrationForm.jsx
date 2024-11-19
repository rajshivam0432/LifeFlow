import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DonorRegistrationForm() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    age: "",
    city: "",
    contact: "",
    pinCode: "",
    gender: "", // Added gender field
    email: "", // Added email field
    password: "", // Added password field
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.bloodType ||
      !formData.age ||
      !formData.city ||
      !formData.contact ||
      !formData.pinCode ||
      !formData.gender ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required!");
      return false;
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      setError("Age must be a positive number!");
      return false;
    }
    if (isNaN(formData.contact) || formData.contact.length < 10) {
      setError("Please enter a valid contact number!");
      return false;
    }
    if (isNaN(formData.pinCode) || formData.pinCode.length !== 6) {
      setError("Pin code must be a 6-digit number!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address!");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  // Handle form submission
  // const token = localStorage.getItem("token");
  const registerDonor = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(
       `${API_BASE_URL}/api/auth/register/donor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register donor");
      }
      navigate("/home");

      setSuccess(true);
      setError("");
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    if (validateForm()) {
      registerDonor();
    }
  };

  useEffect(() => {
    if (success) {
      // Perform any additional actions on successful registration
    }
  }, [success]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <section className="bg-[#E63946] text-white text-center py-16">
        <h1 className="text-4xl font-bold">Register as a Donor</h1>
        <p className="mt-4 text-xl">
          Join the cause and start saving lives by donating blood.
        </p>
      </section>

      <section className="bg-white py-16 px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
            Donor Registration Form
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bloodType"
              className="block text-lg font-medium text-gray-700"
            >
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-lg font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your age"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your city"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-lg font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Pin Code field */}
          <div className="mb-4">
            <label
              htmlFor="pinCode"
              className="block text-lg font-medium text-gray-700"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your pin code"
            />
          </div>

          {/* Gender dropdown */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-lg font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#E63946] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#D62828]"
            >
              Register as Donor
            </button>
          </div>
        </form>
      </section>

      <section className="text-center py-8 bg-gray-100">
        <p className="text-lg text-gray-700">
          Already have an account?{" "}
          <Link to="/login-donor" className="text-[#E63946] font-semibold">
            Login as Donor
          </Link>
        </p>
      </section>
    </div>
  );
}

export default DonorRegistrationForm;
