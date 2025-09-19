import { useEffect, useState } from "react";

export default function AdminCrimes() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all crimes from backend
  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const res = await fetch("http://localhost:3000/crimes");
        const data = await res.json();
        setCrimes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crimes:", err);
        setLoading(false);
      }
    };
    fetchCrimes();
  }, []);

  // Delete a crime
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crime?")) return;
    try {
      const res = await fetch(`http://localhost:3000/crimes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCrimes(crimes.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Error deleting crime:", err);
    }
  };

  // Mock Assign Police
  const handleAssignPolice = (crimeTitle) => {
    const officerName = prompt(`Assign police officer for: "${crimeTitle}"`);
    if (officerName) alert(`🚓 Police officer "${officerName}" assigned to "${crimeTitle}" (mock-up)!`);
  };

  if (loading) return <p className="text-center mt-20">Loading crimes...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Crimes List</h1>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-[#1B3C53] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">Reporter</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map((crime) => (
            <tr key={crime._id} className="border-b text-black hover:bg-gray-100">
              <td className="py-3 px-4">{crime.title}</td>
              <td className="py-3 px-4">{crime.category}</td>
              <td className="py-3 px-4">
                {crime.location?.name || `${crime.location?.coordinates?.join(", ")}`}
              </td>
              <td className="py-3 px-4">{crime.user?.name || "Anonymous"}</td>
              <td className="py-3 px-4">{new Date(crime.time).toLocaleString()}</td>
              <td className="py-3 px-4 text-center flex justify-center gap-2">
                <button
                  onClick={() => handleDelete(crime._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAssignPolice(crime.title)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Assign Police
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {crimes.length === 0 && <p className="text-center mt-6">No crimes found.</p>}
    </div>
  );
}
