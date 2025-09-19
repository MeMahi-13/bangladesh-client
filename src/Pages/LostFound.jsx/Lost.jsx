import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheckCircle, FaPhone, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router";

export default function LostFound() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:3000/lostfound"); // your backend URL
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error("Error fetching lost & found cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Mark as resolved and update backend
  const handleResolve = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/lostfound/${id}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolved: true }),
      });

      if (res.ok) {
        // Update UI
        setCases(cases.map(c => c._id === id ? { ...c, resolved: true } : c));
      } else {
        console.error("Failed to mark as resolved");
      }
    } catch (err) {
      console.error("Error resolving case:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">Loading cases...</div>
    );
  }

  return (
    <section className="bg-green-50 py-20 px-6 md:px-20 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1B3C53] mb-3">
          Lost & Found
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Report lost belongings or help return found items. Together, we can make a difference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {cases.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden border-t-4 border-[#1B3C53] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {c.photo && (
              <img src={c.photo} alt={c.item} className="w-full h-45 object-cover" />
            )}

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-semibold text-[#1B3C53] mb-2">{c.item}</h3>
                <p className="text-gray-500 text-sm mb-1">📍 {c.location}</p>
                <p className="text-gray-500 text-sm mb-1">📅 {c.date}</p>
                <p className="text-gray-500 text-sm flex items-center mb-1">
                  <FaUser className="mr-2" /> {c.reporter}
                </p>
                <p className="text-gray-500 text-sm flex items-center">
                  <FaPhone className="mr-2" /> {c.contact}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                    ${c.type === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                >
                  {c.type === "Lost" ? <FaSearch className="mr-2" /> : <FaBoxOpen className="mr-2" />}
                  {c.type}
                </span>

                <button
                  onClick={() => handleResolve(c._id)}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full
                    ${c.resolved ? "bg-green-500 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                  disabled={c.resolved}
                >
                  <FaCheckCircle className="mr-2" />
                  {c.resolved ? "Resolved" : "Mark as Resolved"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link to={'/addLostFound'}>
        <button className="bg-[#1B3C53] text-white px-8 py-4 rounded-2xl shadow-lg 
                           hover:bg-[#244a66] hover:scale-105 transition-transform duration-300 font-semibold">
          Report Lost / Found Case
        </button></Link>
      </div>
    </section>
  );
}
