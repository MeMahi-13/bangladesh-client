export default function CrimeMarquee({ crimes }) {
  return (
    <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-2 rounded-lg overflow-hidden whitespace-nowrap relative">
      <div
        className="inline-block"
        style={{
          animation: "marquee 110s linear infinite", 
        }}
      >
        {crimes.length === 0
          ? "No crimes reported yet."
          : crimes.map((crime) => (
              <span key={crime._id} className="mr-8 font-medium">
                {crime.title} - {crime.category} - {new Date(crime.time).toLocaleTimeString()}
              </span>
            ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
