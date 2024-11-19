import React, { useState, useEffect } from "react";

function ManageRequests() {
  const [requests, setRequests] = useState([
    { bloodType: "A+", quantity: 2, status: "Pending" },
    { bloodType: "O-", quantity: 1, status: "Approved" },
    { bloodType: "B+", quantity: 3, status: "Rejected" },
    // Add more data here as needed
  ]);

  useEffect(() => {
    // Fetch request data here if from an API
    // setRequests(data);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-8 w-full">
        <h1 className="text-4xl font-bold">Manage Blood Requests</h1>
        <p className="mt-4 text-xl">View and manage your blood requests</p>
      </section>

      {/* Requests Table */}
      <div className="bg-white shadow-md rounded-lg mt-12 w-full max-w-4xl p-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#E63946] text-white">
              <th className="px-4 py-2 text-left">Blood Type</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 text-gray-700">{request.bloodType}</td>
                <td className="px-4 py-3 text-gray-700">{request.quantity}</td>
                <td className="px-4 py-3 text-gray-700">{request.status}</td>
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

export default ManageRequests;
