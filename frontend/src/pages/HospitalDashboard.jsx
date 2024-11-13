import { useState, useEffect } from "react";
import axios from "axios";

const HospitalDashboard = () => {
  const [bloodRequest, setBloodRequest] = useState({
    bloodType: "",
    quantity: "",
  });

  const [inventory, setInventory] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [hospitalName, setHospitalName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/request/hospitals/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        setHospitalName(data.name || "Hospital");
        setInventory(data.bloodUnits || []);
        setPendingRequests(data.pendingRequests || []);
      } catch (err) {
        setError("Error fetching hospital data. Please try again.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setBloodRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (bloodRequest.bloodType && bloodRequest.quantity) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/hospitals/me/requestBlood`,
          {
            bloodType: bloodRequest.bloodType,
            quantity: parseInt(bloodRequest.quantity),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPendingRequests([...pendingRequests, response.data]);
        setBloodRequest({ bloodType: "", quantity: "" });
      } catch (err) {
        console.error("Error submitting blood request:", err);
        setError("Failed to submit blood request. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <section className="bg-[#E63946] text-white text-center py-16">
        <h1 className="text-4xl font-bold">{hospitalName} Dashboard</h1>
        <p className="mt-4 text-xl">
          Manage your blood requests and track inventory.
        </p>
      </section>

      {loading ? (
        <p className="text-center text-gray-600 mt-6">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-6">{error}</p>
      ) : (
        <>
          {/* Request Blood Section */}
          <section className="py-16 px-6 bg-white">
            <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
              Request Blood
            </h2>
            <form
              onSubmit={handleRequestSubmit}
              className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
            >
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
                  value={bloodRequest.bloodType}
                  onChange={handleRequestChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-lg font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={bloodRequest.quantity}
                  onChange={handleRequestChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter quantity"
                  required
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#E63946] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#D62828]"
                >
                  Request Blood
                </button>
              </div>
            </form>
          </section>

          {/* Inventory Section */}
          <section className="py-16 px-6 bg-gray-50">
            <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
              Blood Inventory
            </h2>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-[#E63946] text-white">
                    <th className="px-4 py-2">Blood Type</th>
                    <th className="px-4 py-2">Quantity Available</th>
                    <th className="px-4 py-2">Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.bloodType}</td>
                      <td className="border px-4 py-2">
                        {item.unitsAvailable}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(item.expirationDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pending Requests Section */}
          <section className="py-16 px-6 bg-white">
            <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
              Pending Blood Requests
            </h2>
            <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr className="bg-[#E63946] text-white">
                    <th className="px-4 py-2">Hospital Name</th>
                    <th className="px-4 py-2">Blood Type</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {request.hospitalName}
                      </td>
                      <td className="border px-4 py-2">{request.bloodType}</td>
                      <td className="border px-4 py-2">{request.quantity}</td>
                      <td className="border px-4 py-2">{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HospitalDashboard;
