import { useEffect, useState } from "react";
import { FaBoxOpen, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LostFoundPreview() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:3000/lostfound");
        const data = await res.json();

        // take only first 3 recent cases
        setCases(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching lost & found cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading lost & found...</p>;
  }

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-3">
          Lost & Found Highlights
        </h2>
        <p className="text-gray-600 text-lg">
          Recently reported items by the community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cases.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border-t-4 border-[#1B3C53] hover:shadow-lg transition"
          >
            {c.photo && (
              <img src={c.photo} alt={c.item} className="w-full h-40 object-cover" />
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#1B3C53]">{c.item}</h3>
              <p className="text-gray-500 text-sm">📍 {c.location}</p>
              <p className="text-gray-500 text-sm">📅 {new Date(c.date).toLocaleDateString()}</p>
              <span
                className={`inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm font-medium
                  ${c.type === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
              >
                {c.type === "Lost" ? <FaSearch className="mr-1" /> : <FaBoxOpen className="mr-1" />}
                {c.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Link to full page */}
      <div className="text-center mt-10">
        <Link
          to="/lostfound"
          className="bg-[#1B3C53] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#244a66] transition"
        >
          View All Lost & Found
        </Link>
      </div>
    </section>
  );
}
