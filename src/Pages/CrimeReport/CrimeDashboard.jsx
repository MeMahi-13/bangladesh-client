import { useEffect, useState } from "react";
import CrimeForm from "./CrimeForm";
import CrimeMap from "./CrimeMap";
import CrimeMarquee from "./CrimeMarquee";
import CrimePosts from "./CrimePosts";
import CrimeStats from "./CrimeStats";

export default function CrimeDashboard() {
  const [crimes, setCrimes] = useState([]);
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = ["#DC143C", "#FF7F50", "#4CAF50", "#FFC107", "#8E44AD"];

  const fetchCrimes = async () => {
    try {
      const res = await fetch("http://localhost:3000/crimes");
      const data = await res.json();
      setCrimes(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchCrimes();
    const interval = setInterval(fetchCrimes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async ({ title, description, category }) => {
    if (!coords) return alert("Please get your current location first");
    const [lat, lng] = coords;
    const newCrime = {
      title, description, category,
      location: { type: "Point", coordinates: [lng, lat], name: locationName || "Unknown Location" },
      user: { name: "Anonymous", contact: "" }
    };
    try {
      const res = await fetch("http://localhost:3000/crimes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCrime),
      });
      const data = await res.json();
      if (res.ok) setCrimes(prev => [{ _id: data.insertedId, ...newCrime }, ...prev]);
      else alert("Failed to submit crime: " + data.error);
    } catch (err) { console.error(err); alert("Something went wrong!"); }
  };

  const barData = [], countMap = {}, categoryMap = {};
  crimes.forEach(c => {
    const date = new Date(c.time).toLocaleDateString();
    countMap[date] = (countMap[date] || 0) + 1;
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
  });
  for (let date in countMap) barData.push({ date, crimes: countMap[date] });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  return (
<div>
        <CrimeMarquee crimes={crimes} />
    <div className="">
        
      <CrimeForm onSubmit={handleSubmit} coords={coords} setCoords={setCoords} locationName={locationName} setLocationName={setLocationName} />
 
      <CrimeMap crimes={crimes} coords={coords} />
      <CrimeStats barData={barData} pieData={pieData} COLORS={COLORS} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
           <CrimePosts crimes={crimes} />
    </div>
</div>
  );
}
