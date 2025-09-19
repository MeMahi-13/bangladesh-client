import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SOSButton() {
  const [loading, setLoading] = useState(false);

  const handleSOS = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("SOS Location:", latitude, longitude);

        // 👉 Send to backend / Firestore / emergency contact API
        fetch("http://localhost:3000/sos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("SOS sent:", data);
            alert("SOS alert sent with your location!");
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to send SOS.");
          })
          .finally(() => setLoading(false));
      },
      (error) => {
        console.error(error);
        alert("Could not get location.");
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={handleSOS}
      disabled={loading}
      className="px-8 py-3 bg-amber-400 text-white rounded-xl font-bold hover:bg-amber-600 transition"
    >
        <FontAwesomeIcon icon={faExclamationTriangle} />
      {loading ? "Sending..." : "SOS"}
    </button>
  );
}
