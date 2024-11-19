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
        console.log("Hospital data:", data);

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

  const storedDonor = localStorage.getItem("donor");
  const donor = storedDonor ? JSON.parse(storedDonor) : null;

  if (!donor) {
    console.error("No donor data found in localStorage");
    return <div>No donor data available. Please log in again.</div>;
  }

  const handleShowDonateForm = (bloodType) => {
    setShowDonateForm(true);
    setDonationData((prevData) => ({
      ...prevData,
      bloodType: bloodType || "", // If bloodType is empty, set it to an empty string
      donorName: donor.userId?.name || "",
      age: donor.age || "",
      gender: donor.gender || "",
    }));
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
  
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/api/request/hospitals/${selectedHospital._id}/updateBloodUnits`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            bloodUnits: updatedHospitals.find(
              (h) => h._id === selectedHospital._id
            ).bloodUnits,
          }),
        }
      );

      if (response.ok) {
        console.log("Blood units updated successfully");
        alert("Thank you for your contrubtion");
      } else {
        console.error("Failed to update blood units", response.statusText);
      }
    } catch (error) {
      console.error("Error updating blood units:", error);
    }

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

            {/* Button to show blood units */}
            <button
              onClick={() => handleShowBloodUnits(hospital)}
              className={`px-4 py-2 rounded transition-colors duration-300 ${
                !donationData.bloodType ||
                donationData.bloodType === "Not Applicable"
                  ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 " // Gray color when no blood type selected
                  : "bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300" // Blue color when blood type is available
              }`}
            >
              Show Blood Units
            </button>
          </div>
        ))}
      </div>

      {selectedHospital && selectedHospital.bloodUnits ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Blood Units Available at {selectedHospital.name}
          </h2>
          <div className="space-y-4">
            {selectedHospital.bloodUnits.length > 0 ? (
              selectedHospital.bloodUnits.map((unit, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <p>
                    <span className="font-semibold">Blood Type:</span>{" "}
                    {unit.bloodType || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Units Available:</span>{" "}
                    {unit.unitsAvailable > 0 ? unit.unitsAvailable : "0"}
                  </p>
                  <p>
                    <span className="font-semibold">Expiration Date:</span>{" "}
                    {new Date(unit.expirationDate).toLocaleDateString() ||
                      "N/A"}
                  </p>
                  <button
                    onClick={() => handleShowDonateForm(unit.bloodType)}
                    className="mt-2 ml-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                  >
                    Donate
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
                <p>
                  <span className="font-semibold">Blood Type:</span> N/A
                </p>
                <p>
                  <span className="font-semibold">Units Available:</span> 0
                </p>
                <p>
                  <span className="font-semibold">Expiration Date:</span> N/A
                </p>
                <button
                  onClick={() => handleShowDonateForm("No Blood Type")}
                  className="mt-2 ml-2 bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Donate
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          Please select a hospital to view blood units.
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
              <select
                name="bloodType"
                value={donationData.bloodType || "Not Applicable"} // Default to "Not Applicable"
                onChange={handleDonationChange}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="Not Applicable">Not Applicable</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="A-">A-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O">O</option>
              </select>
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
                value={donationData.age}
                onChange={handleDonationChange}
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
                value={donationData.gender}
                onChange={handleDonationChange}
                readOnly
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300"
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
