import { FaAmbulance, FaChild, FaExclamationTriangle, FaFireExtinguisher, FaHospitalAlt, FaUserShield } from "react-icons/fa";
import data from "../../../src/assets/emergencyData.json";

export default function EmergencyHelp() {
  const { emergencyNumbers, firstAidTips } = data;

  return (
    <section className="bg-gray-50 min-h-screen px-6 md:px-35 py-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-bold text-[#1B3C53] mb-4">
          Emergency Help in Bangladesh
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Quickly access essential emergency numbers and basic first aid information to stay prepared.
        </p>
      </div>

      {/* Emergency Numbers */}
      <div>
        <h2 className="text-3xl font-semibold text-[#1B3C53] mb-6">Emergency Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {emergencyNumbers.map((item, index) => (
            <div key={index} className="flex items-center bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition gap-4">
              <div className={`flex-shrink-0 text-3xl ${item.iconColor}`}>
                {item.service === "Police" && <FaUserShield />}
                {item.service === "Ambulance" && <FaAmbulance />}
                {item.service === "Fire Service" && <FaFireExtinguisher />}
                {item.service === "Child Helpline" && <FaChild />}
                {item.service === "Road Accident Help" && <FaExclamationTriangle />}
                {item.service === "Disaster Management" && <FaHospitalAlt />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600">{item.service}</h3>
                <p className="text-gray-800 font-semibold text-lg">{item.number}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* First Aid Tips */}
<div className="py-10">
  <h2 className="text-3xl font-semibold text-[#1B3C53] mb-6">Basic First Aid Tips</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {firstAidTips.map((tip, index) => (
      <div
        key={index}
        className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
      >
        {/* Image */}
        <img
          src={tip.image}
          alt={tip.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* Title */}
        <h3 className="text-xl font-bold text-blue-600 mb-2">{tip.title}</h3>

        {/* Numbered Steps */}
        <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-3">
          {tip.info.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ol>

        {/* Medicines */}
        {tip.medicines && (
          <div>
            <h4 className="font-semibold text-green-700">Suggested Medicines:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {tip.medicines.map((med, j) => (
                <li key={j}>{med}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
