import React, { useState, useEffect, useRef } from 'react';

function ManageInventory() {
  const initialInventory = {
    'A+': [],
    'B+': [],
    'O+': [],
    'AB+': [],
    'A-': [],
    'B-': [],
    'O-': [],
    'AB-': [],
  };

  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('bloodInventory');
    return savedInventory ? JSON.parse(savedInventory) : initialInventory;
  });
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newUnits, setNewUnits] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [selectedUnitToRemove, setSelectedUnitToRemove] = useState({});

  const addSectionRef = useRef(null);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bloodInventory', JSON.stringify(inventory));
  }, [inventory]);

  // Check for expired blood units on page load and every minute
  useEffect(() => {
    const interval = setInterval(() => checkForExpiredBlood(), 60000);
    checkForExpiredBlood(); // Initial check
    return () => clearInterval(interval);
  }, [inventory]);

  const checkForExpiredBlood = () => {
    const today = new Date().toISOString().split('T')[0];
    Object.entries(inventory).forEach(([bloodGroup, units]) => {
      units.forEach((unit) => {
        if (unit.expiryDate === today) {
          alert(`Alert: Blood unit from ${bloodGroup} expired on ${unit.expiryDate}`);
        }
      });
    });
  };

  const handleAddUnit = () => {
    if (selectedGroup && newUnits && newExpiryDate) {
      const unitsToAdd = parseInt(newUnits, 10);
      const newUnit = { units: unitsToAdd, expiryDate: newExpiryDate };
      const updatedInventory = {
        ...inventory,
        [selectedGroup]: [...inventory[selectedGroup], newUnit],
      };
      setInventory(updatedInventory);
      setNewUnits('');
      setNewExpiryDate('');
    }
  };

  const handleRemoveUnit = (bloodGroup, index) => {
    const updatedInventory = {
      ...inventory,
      [bloodGroup]: inventory[bloodGroup].filter((_, idx) => idx !== index),
    };
    setInventory(updatedInventory);
    setSelectedUnitToRemove({}); // Reset the selected unit
  };

  const scrollToAddSection = (bloodGroup) => {
    setSelectedGroup(bloodGroup); // Set the selected blood group
    addSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectUnitToRemove = (bloodGroup, index) => {
    setSelectedUnitToRemove({ bloodGroup, index: parseInt(index, 10) });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-8 w-full">
        <h1 className="text-4xl font-bold">Manage Inventory</h1>
        <p className="text-lg mt-2">Efficiently track and manage blood units</p>
      </section>

      {/* Inventory Table */}
      <div className="mt-12 w-full max-w-6xl px-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-[#E63946] text-white">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase">Blood Group</th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase">Total Units</th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase">Available Units</th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventory).map(([bloodGroup, units]) => {
                const totalUnits = units.reduce((acc, unit) => acc + unit.units, 0);
                return (
                  <tr key={bloodGroup} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 font-medium">{bloodGroup}</td>
                    <td className="py-4 px-6 text-gray-800">{totalUnits}</td>
                    <td className="py-4 px-6 text-gray-800">
                      {units.length > 0 ? (
                        <select
                          className="bg-gray-100 border rounded px-4 py-2"
                          onChange={(e) => handleSelectUnitToRemove(bloodGroup, e.target.value)}
                          value={
                            selectedUnitToRemove.bloodGroup === bloodGroup
                              ? selectedUnitToRemove.index
                              : ''
                          }
                        >
                          <option value="" disabled>
                            Select a unit
                          </option>
                          {units.map((unit, index) => (
                            <option key={index} value={index}>
                              {unit.units} unit(s) - Exp: {unit.expiryDate}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-500">No units available</span>
                      )}
                    </td>
                    <td className="py-4 px-6 flex gap-4">
                      <button
                        onClick={() =>
                          handleRemoveUnit(bloodGroup, selectedUnitToRemove.index)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                        disabled={
                          selectedUnitToRemove.bloodGroup !== bloodGroup ||
                          selectedUnitToRemove.index === undefined
                        }
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => scrollToAddSection(bloodGroup)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Unit Form */}
      <div ref={addSectionRef} className="mt-12 w-full max-w-6xl px-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl text-center text-red-500 font-semibold mb-4">Add New Blood Unit</h2>
          <div className="flex flex-col gap-4">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-gray-100 border rounded px-4 py-2"
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              {Object.keys(inventory).map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newUnits}
              onChange={(e) => setNewUnits(e.target.value)}
              placeholder="Enter number of units"
              className="bg-gray-100 border rounded px-4 py-2"
              min="1"
            />
            <input
              type="date"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              className="bg-gray-100 border rounded px-4 py-2"
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={handleAddUnit}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
            >
              Add Unit
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#E63946] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">© 2024 Blood Donation Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ManageInventory;
