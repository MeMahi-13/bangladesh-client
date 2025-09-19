import CountUp from "react-countup";
import { FaAmbulance, FaClipboardList, FaShieldAlt, FaUsers } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

export default function AboutStats() {
  const stats = [
    { icon: <FaClipboardList className="w-10 h-10 text-[#1B3C53]" />, value: 1245, label: "Reports Handled", suffix: "+" },
    { icon: <FaAmbulance className="w-10 h-10 text-[#DC2626]" />, value: 732, label: "Emergency Calls Responded", suffix: "+" },
    { icon: <FaUsers className="w-10 h-10 text-[#2563EB]" />, value: 5000, label: "Active Users", suffix: "+" },
    { icon: <FaShieldAlt className="w-10 h-10 text-[#059669]" />, value: 98, label: "Cases Resolved", suffix: "%" },
  ];

  // Intersection Observer
  const [ref, inView] = useInView({
    triggerOnce: true, // only trigger once
    threshold: 0.3, // start when 30% visible
  });

  return (
    <section ref={ref} className="bg-white py-16 px-8 md:px-16">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1B3C53] mb-4">About Secure Bangladesh</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Secure Bangladesh is a citizen-centric platform designed to make crime reporting and emergency assistance fast,
          reliable, and accessible. Our mission is to empower communities and ensure public safety across the country.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-[#1B3C53]">
              {inView ? (
                <CountUp end={stat.value} duration={3} separator="," suffix={stat.suffix || ""} />
              ) : (
                0
              )}
            </h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
