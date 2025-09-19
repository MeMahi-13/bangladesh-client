import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can call your backend API to save/send the message
    console.log({ name, email, message });

    setStatus("✅ Message sent!");
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setStatus(""), 3000); // clear status after 3s
  };

  return (
    <div className="flex justify-center bg-lightblue items-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white text-gray-800 p-8 rounded-2xl shadow-xl border border-green-900">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2 text-center text-blue">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Have any questions? We’d love to hear from you.
        </p>

        {/* Status message */}
        {status && (
          <p className="text-green-600 font-medium mb-4 text-center">{status}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Write your message..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>


      </div>
    </div>
  );
}
