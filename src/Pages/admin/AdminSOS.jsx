import { useEffect, useState } from "react";

export default function AdminSOS() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch SOS alerts from backend
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:3000/sos");
        const data = await res.json();
        setAlerts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching SOS alerts:", err);
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  // Mock "Mark as handled"
  const handleMarkHandled = (id) => {
    alert(`SOS alert ${id} marked as handled (mock-up)!`);
    // Remove from UI to simulate handling
    setAlerts(alerts.filter((a) => a._id !== id));
  };

  if (loading) return <p className="text-center mt-20">Loading SOS alerts...</p>;

  return (
    <div className="bg-green-50 min-h-screen w-full py-10">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">SOS Alerts</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#1B3C53] text-white">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">IP</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr
                  key={alert._id}
                  className="border-b text-black hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{alert.user?.name || "Anonymous"}</td>
                  <td className="py-3 px-4">{alert.user?.contact || "N/A"}</td>
                  <td className="py-3 px-4">{`${alert.latitude}, ${alert.longitude}`}</td>
                  <td className="py-3 px-4">{alert.ip}</td>
                  <td className="py-3 px-4">{new Date(alert.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleMarkHandled(alert._id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                    >
                      Mark as Handled
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {alerts.length === 0 && (
          <p className="text-center mt-6 text-green-900 font-medium">
            No SOS alerts found.
          </p>
        )}
      </div>
    </div>
  );
}
