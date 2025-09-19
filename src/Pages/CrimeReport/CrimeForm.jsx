import { useState } from "react";

export default function CrimeForm({ onSubmit, coords, setCoords, locationName, setLocationName }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setCoords([lat, lng]);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          { headers: { "User-Agent": "BangladeshCrimeApp/1.0" } }
        );
        const data = await res.json();
        setLocationName(data.display_name || "Unknown Location");
      } catch {
        setLocationName("Unknown Location");
      } finally {
        setLoadingLocation(false);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category });
    setTitle(""); setDescription(""); setCategory("Other");
  };

  return (
<div className="py-10 bg-lightblue">
  <h1 className="text-4xl py-5 text-center font-bold  text-[#1B3C53]">Report a Crime</h1>
      <div className="bg-white mx-auto max-w-6xl py-10 text-black p-6 rounded-2xl shadow-md space-y-4">
      
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
      />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
      >
        <option value="Theft">Theft</option>
        <option value="Assault">Assault</option>
        <option value="Vandalism">Vandalism</option>
        <option value="Other">Other</option>
      </select>
      <div className="flex gap-4">
        <button type="button" onClick={handleGetLocation}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          {loadingLocation ? "Getting Location..." : "Get Current Location"}
        </button>
        <button type="submit" onClick={handleSubmit} disabled={!coords}
          className={`flex-1 px-4 py-2 rounded-lg text-white transition ${coords ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>
          Submit
        </button>
      </div>
      {coords && <p className="text-gray-600 mt-2">Location: {locationName}</p>}
    </div>
</div>
  );
}
