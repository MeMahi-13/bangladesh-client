import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  // Example: fetch news from backend
  useEffect(() => {
    // Replace with your backend API if you have one
    const fetchNews = async () => {
      // Example static data
      const data = [
        {
          _id: "1",
          title: "Tourism in Sundarbans Thrives",
          date: "2025-08-19",
          content: "The Sundarbans have seen a record number of tourists this year due to increased awareness campaigns.",
        },
        {
          _id: "2",
          title: "Community Crime Reporting Launched",
          date: "2025-08-18",
          content: "A new platform allows citizens to report crimes in real-time, helping authorities respond faster.",
        },
        {
          _id: "3",
          title: "Medicinal Awareness Drive in Dhaka",
          date: "2025-08-17",
          content: "Health organizations are conducting drives to educate the public about essential medicines and their effects.",
        },
      ];
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Latest News</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{new Date(item.date).toLocaleDateString()}</p>
              <p className="text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
