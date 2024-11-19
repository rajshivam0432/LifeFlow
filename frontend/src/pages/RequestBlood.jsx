import { useState, useEffect } from "react";

function RequestBlood() {
  const [formData, setFormData] = useState({
    bloodType: "",
    quantity: "",
    urgency: "",
    message: "",
    addressType: "registered", // default to registered address
    newAddress: "",
  });

  const [registeredAddress, setRegisteredAddress] = useState("");

  useEffect(() => {
    // Fetch hospital data from localStorage
    const hospitalData = JSON.parse(localStorage.getItem("hospital"));
    if (hospitalData && hospitalData.address) {
      setRegisteredAddress(hospitalData.address);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAddress =
      formData.addressType === "registered"
        ? registeredAddress
        : formData.newAddress;

    const requestBody = {
      bloodType: formData.bloodType,
      quantity: formData.quantity,
      urgency: formData.urgency,
      message: formData.message,
      address: finalAddress,
      updateAddress: formData.addressType === "new", // Indicates if address should be updated
    };

    try {console.log("request", requestBody);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/api/request/hospitals/me/requestBlood`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Blood request submitted successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-8 w-full">
        <h1 className="text-4xl font-bold">Request Blood</h1>
        <p className="mt-4 text-xl">
          Submit a request for the blood type and quantity you need
        </p>
      </section>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 mt-12 w-full max-w-md space-y-6"
      >
        {/* Blood Type */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Quantity (Units)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            min="1"
            required
          />
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Urgency
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Address Selection */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Address
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="registered"
                checked={formData.addressType === "registered"}
                onChange={handleChange}
                className="mr-2"
              />
              Use Registered Address
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="new"
                checked={formData.addressType === "new"}
                onChange={handleChange}
                className="mr-2"
              />
              Use New Address
            </label>
          </div>
        </div>

        {/* New Address Field */}
        {formData.addressType === "new" && (
          <div className="mt-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              New Address
            </label>
            <input
              type="text"
              name="newAddress"
              value={formData.newAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter new address"
              required
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
            placeholder="Any additional information..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#E63946] text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-[#d82f3e]"
        >
          Submit Request
        </button>
      </form>

      {/* Footer Section */}
      <footer className="bg-[#E63946] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">
          © 2024 Blood Donation Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default RequestBlood;
