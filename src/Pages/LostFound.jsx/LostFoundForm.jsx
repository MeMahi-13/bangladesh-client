import { useState } from "react";

export default function AddLostFound({ userEmail }) { // receive logged-in email as prop
  const [type, setType] = useState("Lost");
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [reporter, setReporter] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !location || !date || !reporter || !contact) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("item", item);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("reporter", reporter);
    formData.append("contact", contact);
    formData.append("email", userEmail); // Add logged-in user's email
    if (photo) formData.append("photo", photo);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/lostfound", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("Lost/Found case submitted successfully!");
      // Reset form
      setType("Lost");
      setItem("");
      setLocation("");
      setDate("");
      setReporter("");
      setContact("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting the case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black bg-green-50 min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 max-w-lg w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-[#1B3C53] text-center mb-6">
          Report Lost / Found Item
        </h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input
          type="text"
          placeholder="Item Name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        />

        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        />

        <input
          type="text"
          placeholder="Reporter Name"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        />

        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:outline-none"
        />

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          className="w-full text-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1B3C53] hover:bg-[#244a66]"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
