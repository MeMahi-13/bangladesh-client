import { useEffect, useState } from "react";

export default function AdminLostFound() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all lost & found cases
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:3000/lostfound");
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

  // Mark case as resolved
  const handleResolve = async (id) => {
    if (!window.confirm("Are you sure you want to mark this case as resolved?")) return;

    try {
      const res = await fetch(`http://localhost:3000/lostfound/${id}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolved: true }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // Update UI
        setCases(cases.map(c => c._id === id ? { ...c, resolved: true } : c));
      } else {
        alert(data.message || "Failed to resolve case");
      }
    } catch (err) {
      console.error("Error resolving case:", err);
      alert("Server error. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading Lost & Found cases...</p>;

  return (
    <div className="px-15 py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Lost & Found Cases</h1>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-[#1B3C53] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Item</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Reporter</th>
            <th className="py-3 px-4 text-left">Contact</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id} className="border-b text-black hover:bg-gray-100">
              <td className="py-5 px-6">{c.type}</td>
              <td className="py-5 px-6">{c.item}</td>
              <td className="py-5 px-6">{c.location}</td>
              <td className="py-5 px-6">{new Date(c.date).toLocaleDateString()}</td>
              <td className="py-5 px-6">{c.reporter}</td>
              <td className="py-5 px-6">{c.contact}</td>
              <td className="py-5 px-6">
                {c.resolved ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Resolved</span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">Pending</span>
                )}
              </td>
              <td className="py-5 px-6 text-center">
                {!c.resolved && (
                  <button
                    onClick={() => handleResolve(c._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Mark as Resolved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cases.length === 0 && <p className="text-center mt-6">No lost & found cases found.</p>}
    </div>
  );
}
