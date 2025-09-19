import { useEffect, useState } from 'react';

const AdminStats = () => {
  const [counts, setCounts] = useState({ crimes: 0, sos: 0, medicines: 0, lostfound: 0 });


  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/counts");
        const data = await res.json();
        setCounts(data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className=" text-black py-16 px-4">
      <h1 className="text-4xl md:text-4xl font-bold text-center mb-12">
        Total Reports to Solve
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Crimes Card */}
        <div className="text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold mb-4">Total Crimes</h2>
          <p className="text-4xl font-bold">{counts.crimes}</p>
        </div>

        {/* SOS Card */}
        <div className="text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold mb-4">SOS Alerts</h2>
          <p className="text-4xl font-bold">{counts.sos}</p>
        </div>

        {/* Lost & Found Card */}
        <div className="text-white bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold mb-4">Lost & Found Cases</h2>
          <p className="text-4xl font-bold">{counts.lostfound || 0}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminStats;
