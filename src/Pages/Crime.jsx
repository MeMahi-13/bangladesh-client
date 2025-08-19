import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

// Optional: component to pan map to new coords
function MapPanner({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 12);
  }, [coords]);
  return null;
}

export default function CrimePage() {
  const [crimes, setCrimes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [coords, setCoords] = useState([23.8103, 90.4125]); // default Dhaka coords

  // Fetch crimes from backend
  const fetchCrimes = async () => {
    const res = await fetch("http://localhost:3000/crimes");
    const data = await res.json();
    setCrimes(data);
  };

  useEffect(() => {
    fetchCrimes();
    const interval = setInterval(fetchCrimes, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Handle new crime submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCrime = {
      title,
      description,
      category,
      location: { type: "Point", coordinates: [coords[1], coords[0]] }, // [lng, lat]
      time: new Date(),
      user: { name: "Anonymous", contact: "" },
    };

    try {
      const res = await fetch("http://localhost:3000/crimes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCrime),
      });
      const data = await res.json();

      if (res.ok) {
        // Add the new crime to local state immediately
        setCrimes((prev) => [{ _id: data.insertedId, ...newCrime }, ...prev]);
        setTitle("");
        setDescription("");
        setCategory("Other");
        setCoords([coords[0], coords[1]]); // optional: pan map to new coords
      } else {
        alert("Failed to submit crime: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // Prepare chart data (crimes per day)
  const chartData = [];
  const countMap = {};
  crimes.forEach((c) => {
    const date = new Date(c.time).toLocaleDateString();
    countMap[date] = (countMap[date] || 0) + 1;
  });
  for (let date in countMap) chartData.push({ date, crimes: countMap[date] });

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left side: Form + List */}
      <div className="lg:w-1/2 p-6 overflow-y-auto">
        {/* Crime Form */}
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-black shadow text-white">
          <h2 className="text-xl font-bold mb-2">Report a Crime</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded text-black"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded text-black"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-2 border rounded text-black"
          >
            <option value="Theft">Theft</option>
            <option value="Assault">Assault</option>
            <option value="Vandalism">Vandalism</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="button"
            onClick={() =>
              navigator.geolocation.getCurrentPosition((pos) =>
                setCoords([pos.coords.latitude, pos.coords.longitude])
              )
            }
            className="mb-2 bg-blue-500 text-black px-4 py-2 rounded"
          >
            Get Current Location
          </button>
          <br />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        {/* Crime List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
          {crimes.map((crime) => (
            <div key={crime._id} className="p-4 border-b">
              <h3 className="font-semibold">{crime.title} ({crime.category})</h3>
              <p>{crime.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(crime.time).toLocaleString()} | Location:{" "}
                {crime.location.coordinates[1].toFixed(4)}, {crime.location.coordinates[0].toFixed(4)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Map + Chart */}
      <div className="lg:w-1/2 flex flex-col p-6 space-y-6">
        {/* Map */}
        <div className="h-1/2">
          <MapContainer center={coords} zoom={12} scrollWheelZoom={true} className="h-full w-full rounded-lg shadow">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapPanner coords={coords} />
            {crimes.map((crime) => (
              <Marker
                key={crime._id}
                position={[crime.location.coordinates[1], crime.location.coordinates[0]]}
              >
                <Popup>
                  <strong>{crime.title}</strong>
                  <p>{crime.description}</p>
                  <p>Category: {crime.category}</p>
                  <p>{new Date(crime.time).toLocaleString()}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Chart */}
        <div className="h-1/2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Crimes Per Day</h2>
          <BarChart width={500} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="crimes" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
