export default function CrimePosts({ crimes }) {
  return (
    <div className="bg-lightblue py-10 ">
      <div className="space-y-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1B3C53] mb-2 py-7 border-b border-gray-200 pb-2">Reported Crimes</h2>
        {crimes.length === 0 && <p className="text-gray-500">No crimes reported yet.</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          {crimes.map((crime) => (
            <div key={crime._id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="font-bold text-[#1B3C53] text-lg mb-1">{crime.title}</h3>
              <p className="text-gray-700 mb-2">{crime.description}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Category:</span> {crime.category}<br />
                <span className="font-semibold">Location:</span> {crime.location.name || "Unknown"}<br />
                <span className="font-semibold">Time:</span> {new Date(crime.time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
