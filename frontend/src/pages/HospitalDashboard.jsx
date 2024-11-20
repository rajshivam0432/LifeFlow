import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-8 w-full">
        <h1 className="text-4xl font-bold">Hospital Dashboard</h1>
        <p className="mt-4 text-xl">Manage blood requests and inventory efficiently</p>
      </section>

      {/* Main Content Section */}
      <div className="mt-12 flex flex-col gap-8 w-full max-w-md px-6">
        {/* Request Blood Button */}
        <Link 
          to="/hospital-dashboard/request-blood"
          className="bg-[#E63946] text-white text-center px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#d82f3e]"
        >
          Request Blood
        </Link>

        {/* Manage Blood Inventory Button */}
        <Link 
          to="/hospital-dashboard/manage-inventory"
          className="bg-[#E63946] text-white text-center px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#d82f3e]"
        >
          Manage Blood Inventory
        </Link>

        {/* View Blood Inventory Button */}
       

        {/* Manage Requests Button */}
        <Link 
          to="/hospital-dashboard/manage-requests"
          className="bg-[#E63946] text-white text-center px-6 py-4 rounded-lg text-lg font-semibold hover:bg-[#d82f3e]"
        >
          Manage Requests
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#E63946] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">© 2024 Blood Donation Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HospitalDashboard;
