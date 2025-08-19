import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Example: fetch feedback from backend (replace with API)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      // Static example data
      const data = [
        { _id: "1", name: "Alice", message: "Great platform, very helpful!", date: "2025-08-18" },
        { _id: "2", name: "Bob", message: "Love the real-time crime reporting feature.", date: "2025-08-17" },
      ];
      setFeedbacks(data);
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      _id: Date.now().toString(),
      name,
      message,
      date: new Date().toISOString().split("T")[0],
    };

    // Here you would send it to backend
    setFeedbacks((prev) => [newFeedback, ...prev]);
    setName("");
    setMessage("");
    setStatus("Feedback submitted!");

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">User Feedback</h1>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
          {status && <p className="text-green-500 mb-2 text-center">{status}</p>}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </form>

        {/* Display Feedbacks */}
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold text-gray-800">{fb.name}</p>
              <p className="text-gray-700">{fb.message}</p>
              <p className="text-sm text-gray-500">{new Date(fb.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
