import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function MapPanner({ coords }) {
  const map = useMap();
  useEffect(() => { if (coords) map.setView(coords, 12); }, [coords]);
  return null;
}

export default function CrimeMap({ crimes, coords }) {
  return (
<div className="bg-white py-15">
      <h1 className="text-blue text-4xl font-bold text-center py-12 bg-white"> View the Most Reported Area</h1>
      <div className="h-100 rounded-2xl overflow-hidden shadow-lg mx-auto max-w-6xl">
  
      <MapContainer center={coords || [23.8103, 90.4125]} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <MapPanner coords={coords || [23.8103, 90.4125]} />
        {crimes.map(crime => (
          <Marker key={crime._id} position={[crime.location.coordinates[1], crime.location.coordinates[0]]}>
            <Popup>
              <strong>{crime.title}</strong>
              <p>{crime.description}</p>
              <p>Category: {crime.category}</p>
              <p>Location: {crime.location.name || "Unknown"}</p>
              <p>{new Date(crime.time).toLocaleString()}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
</div>
  );
}
