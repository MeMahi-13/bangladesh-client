import { useEffect, useState } from "react";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/medicines?search=${search}`)
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, [search]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6">
        💊 Medicine Directory
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border-2 border-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Medicine Grid */}
      {medicines.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {medicines.map((med) => (
            <div
              key={med._id}
              className="p-6 border border-gray-200 rounded-2xl shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-transform duration-200"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-2">{med.name}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {med.category}
              </p>
              <p className="mt-2 text-green-700">
                <span className="font-semibold">✅ Effects:</span> {med.effects}
              </p>
              <p className="mt-2 text-red-600">
                <span className="font-semibold">⚠️ Side Effects:</span> {med.sideEffects}
              </p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>💰 {med.price} BDT</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No medicines found.</p>
      )}
    </div>
  );
}
