import { FaAmbulance, FaChartLine, FaFileAlt, FaUsers } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      title: "Report Crime",
      description: "Fill out a simple form to report a crime with all necessary details.",
      icon: <FaFileAlt className="text-red-600 w-10 h-10" />,
    },
    {
      title: "Emergency Assistance",
      description: "Access instant help from police, ambulance, or fire service whenever needed.",
      icon: <FaAmbulance className="text-orange-500 w-10 h-10" />,
    },
    {
      title: "Track Reports",
      description: "Stay updated on your submitted reports with real-time status changes.",
      icon: <FaChartLine className="text-green-600 w-10 h-10" />,
    },
    {
      title: "Community Safety",
      description: "Contribute to a safer neighborhood and help the community stay secure.",
      icon: <FaUsers className="text-blue-600 w-10 h-10" />,
    },
  ];

  return (
    <section className="bg-[#F9FAFB] py-16 px-8 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1B3C53] mb-4">How It Works</h2>
        <p className="text-gray-700 text-lg md:text-xl">
          Secure Bangladesh is simple and easy to use. Follow these steps to stay safe and report crimes quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#1B3C53]">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
