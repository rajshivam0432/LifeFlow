import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ViewInventory() {
  const [inventory, setInventory] = useState([]);
//   const [error, setError] = useState("");
//   const [bloodRequest, setBloodRequest] = useState({
//     bloodType: "",
//     quantity: "",
//   });
//   const navigate = useNavigate();

  // Fetch inventory from localStorage when the component mounts
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("bloodInventory"));

    if (savedInventory && Array.isArray(savedInventory)) {
      setInventory(savedInventory); // If valid array, set the inventory state
    } else {
      // Set default inventory if not available in localStorage
      const defaultInventory = [
        { bloodType: "A+", units: 10, expiryDate: "2024-12-01" },
        { bloodType: "O-", units: 5, expiryDate: "2024-11-25" },
        { bloodType: "B+", units: 7, expiryDate: "2024-12-10" },
      ];
      setInventory(defaultInventory);
    }
  }, []);
 console.log(inventory,"inventory")
  // Handle blood request submission


  // Save the inventory to localStorage (as an array)
  useEffect(() => {
    localStorage.setItem("bloodInventory", JSON.stringify(inventory));
  }, [inventory]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-8 w-full">
        <h1 className="text-4xl font-bold">Blood Inventory</h1>
        <p className="mt-4 text-xl">
          View current blood stock and expiry dates
        </p>
      </section>

      {/* Inventory Table */}
      <div className="bg-white shadow-md rounded-lg mt-12 w-full max-w-4xl p-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#E63946] text-white">
              <th className="px-4 py-2 text-left">Blood Type</th>
              <th className="px-4 py-2 text-left">Units Available</th>
              <th className="px-4 py-2 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 text-gray-700">{item.bloodType}</td>
                <td className="px-4 py-3 text-gray-700">{item.units}</td>
                <td className="px-4 py-3 text-gray-700">{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     

      {/* Footer Section */}
      <footer className="bg-[#E63946] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">
          © 2024 Blood Donation Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ViewInventory;
