import { useEffect, useState } from "react";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    bloodType: "",
    units: "",
    requesterName: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/api/request/hospitals`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setHospitals(data);
        } else {
          console.error("Expected an array of hospitals from the API");
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const storedUser = localStorage.getItem("donor");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <div>No user data available. Please log in again.</div>;
  }

  const handleShowRequestForm = (hospital) => {
    setSelectedHospital(hospital);
    setShowRequestForm(true);
    setRequestData((prevData) => ({
      ...prevData,
      requesterName: user.userId?.name || "",
      age: user.age || "",
      gender: user.gender || "",
    }));
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("requestdat", requestData);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/api/request/hospitals/${selectedHospital._id}/requestBlood`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        alert("Blood request submitted successfully");
        setShowRequestForm(false);
        setRequestData({
          bloodType: "",
          units: "",
          requesterName: "",
          age: "",
          gender: "",
        });
      } else {
        console.error("Failed to submit blood request", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Hospital List</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital._id}
            className="bg-white shadow-md rounded-lg p-6 w-64 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {hospital.name}
            </h2>
            <p className="text-gray-600">{hospital.city}</p>
            <p className="text-gray-600 font-bold">
              Address: {hospital.address}
            </p>
            <p className="text-gray-600 font-bold">
              License: {hospital.licenseNumber}
            </p>
            <p className="text-gray-600 font-bold">
              Contact: {hospital.contact}
            </p>
            <p className="text-gray-600 mb-4 font-bold">
              Email: {hospital.email}
            </p>

            <button
              onClick={() => handleShowRequestForm(hospital)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Request Blood
            </button>
          </div>
        ))}
      </div>

      {showRequestForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Request Blood from {selectedHospital?.name}
          </h2>
          <form onSubmit={handleRequestSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Blood Type
              </label>
              <select
                name="bloodType"
                value={requestData.bloodType}
                onChange={handleRequestChange}
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Units
              </label>
              <input
                type="number"
                name="units"
                value={requestData.units}
                onChange={handleRequestChange}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Requester Name
              </label>
              <input
                type="text"
                name="requesterName"
                value={requestData.requesterName}
                readOnly
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={requestData.age}
                readOnly
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={requestData.gender}
                readOnly
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HospitalList;
