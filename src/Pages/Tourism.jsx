import { useEffect, useState } from "react";

export default function TourismPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        🌍 Explore Bangladesh
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((place) => (
          <div
            key={place._id}
            className="border rounded-xl shadow-lg bg-white hover:scale-105 transition"
          >
            <img src={place.image} alt={place.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-700">{place.name}</h2>
              <p className="text-gray-600">{place.description}</p>
              <p className="mt-2 text-sm text-green-700">
                <strong>Best Time:</strong> {place.bestTime}
              </p>
              <p className="text-sm text-gray-500">💰 {place.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
