import { useEffect, useState } from "react";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [donationData, setDonationData] = useState({
    bloodType: "",
    units: "",
    donorName: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch hospital data from the API
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/request/hospitals",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json(); // Parse JSON response
        console.log("Hospital data:", data); // Log full data to verify

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

  const handleShowBloodUnits = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleShowDonateForm = (bloodType) => {
    setShowDonateForm(true);
    setDonationData({ ...donationData, bloodType });
  };

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    const updatedHospitals = hospitals.map((hospital) => {
      if (hospital._id === selectedHospital._id) {
        const updatedBloodUnits = [...hospital.bloodUnits];
        const existingBloodUnit = updatedBloodUnits.find(
          (unit) => unit.bloodType === donationData.bloodType
        );

        if (existingBloodUnit) {
          existingBloodUnit.unitsAvailable += parseInt(donationData.units);
        } else {
          updatedBloodUnits.push({
            bloodType: donationData.bloodType,
            unitsAvailable: parseInt(donationData.units),
            expirationDate: new Date().toISOString().split("T")[0],
          });
        }

        return { ...hospital, bloodUnits: updatedBloodUnits };
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    setShowDonateForm(false);
    setDonationData({
      bloodType: "",
      units: "",
      donorName: "",
      age: "",
      gender: "",
    });
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
            <p className="text-gray-600">Address: {hospital.address}</p>
            <p className="text-gray-600">License: {hospital.licenseNumber}</p>
            <p className="text-gray-600">Contact: {hospital.contact}</p>
            <p className="text-gray-600 mb-4">Email: {hospital.email}</p>
            <button
              onClick={() => handleShowBloodUnits(hospital)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Show Blood Units
            </button>
          </div>
        ))}
      </div>

      {selectedHospital && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Blood Units Available at {selectedHospital.name}
          </h2>
          <div className="space-y-4">
            {selectedHospital.bloodUnits.map((unit, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p>
                  <span className="font-semibold">Blood Type:</span>{" "}
                  {unit.bloodType}
                </p>
                <p>
                  <span className="font-semibold">Units Available:</span>{" "}
                  {unit.unitsAvailable}
                </p>
                <p>
                  <span className="font-semibold">Expiration Date:</span>{" "}
                  {new Date(unit.expirationDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleShowDonateForm(unit.bloodType)}
                  className="mt-2 ml-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                >
                  Donate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDonateForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Donate Blood</h2>
          <form onSubmit={handleDonationSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Blood Type
              </label>
              <input
                type="text"
                name="bloodType"
                value={donationData.bloodType}
                onChange={handleDonationChange}
                readOnly
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Units
              </label>
              <input
                type="number"
                name="units"
                value={donationData.units}
                onChange={handleDonationChange}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Donor Name
              </label>
              <input
                type="text"
                name="donorName"
                value={donationData.donorName}
                onChange={handleDonationChange}
                required
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
                value={donationData.age}
                onChange={handleDonationChange}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={donationData.gender}
                onChange={handleDonationChange}
                required
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Submit Donation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HospitalList;
    