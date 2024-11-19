import { useState } from "react";
import { useNavigate } from "react-router-dom"


function RegisterHospital() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !name ||
      !address ||
      !city ||
      !licenseNumber ||
      !pinCode ||
      !email ||
      !password
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      setError("Pin Code must be a 6-digit number.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // API call for hospital registration
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

     const response = await fetch(
       `${API_BASE_URL}/api/auth/register/hospital`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           name,
           address,
           city,
           licenseNumber,
           pinCode,
           email,
           password,
         }),
       }
     );


      if (!response.ok) {
        throw new Error("Failed to register the hospital. Please try again.");
      }

      setSuccess(true);
      setError("");
      alert("Hospital registered successfully!");
      navigate("/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-16">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Register as a Hospital
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Registration successful!
          </p>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter hospital name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter city"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block text-gray-700">
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter license number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pinCode" className="block text-gray-700">
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter pin code"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-3 px-6 rounded-lg w-full hover:bg-red-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterHospital;
