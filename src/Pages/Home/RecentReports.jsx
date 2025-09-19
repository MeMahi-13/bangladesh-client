import { CalendarDays, MapPin, ShieldAlert, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function RecentReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:3000/crimes"); // your backend route
        const data = await res.json();

        // show latest 4 reports only
        setReports(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#D3DAD9] py-16 px-8 md:px-16 text-center">
        <p className="text-gray-600 text-lg">Loading recent reports...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#D3DAD9] py-16 px-8 md:px-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1B3C53] mb-4">
          Recent Reports
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          See the latest crime reports submitted by citizens.
          Reporter identities are anonymized for privacy.
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report, index) => (
          <div
            key={report._id || index}
            className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
            {/* Icon */}
            <div className="absolute -top-6 left-6 bg-[#1B3C53] text-white p-3 rounded-xl shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-semibold text-[#1B3C53] mt-4 mb-4">
              {report.type}
            </h3>

            <p className="flex items-center text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-[#1B3C53]" />
              {report.location?.name ||
                `${report.location?.coordinates?.[1]}, ${report.location?.coordinates?.[0]}` ||
                "Unknown"}
            </p>

            <p className="flex items-center text-gray-700 mb-2">
              <CalendarDays className="w-4 h-4 mr-2 text-[#1B3C53]" />
              {new Date(report.date).toLocaleDateString()}
            </p>
            <p className="flex items-center text-gray-500">
              <User className="w-4 h-4 mr-2 text-[#1B3C53]" />
              {report.reporter || "Anonymous"}
            </p>
          </div>
        ))}

       
      </div>
       <div className="flex justify-center">
  <Link to="/crime">
    <button
      className="mt-10 bg-[#1B3C53] text-white px-6 py-3 rounded-xl shadow-md 
                 hover:bg-[#163043] hover:shadow-lg transition duration-300"
    >
      View More Reports
    </button>
  </Link>
</div>

    </section>
  );
}
