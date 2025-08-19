export default function AboutSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/7VfXk1L/bangladesh-river.jpg"
            alt="Bangladesh"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            About Bangladesh 2.0
          </h2>
          <p className="text-gray-700 mb-4">
            Bangladesh 2.0 is a modern platform designed to connect people with the best of Bangladesh. Explore tourism destinations, stay informed about local happenings, and contribute to community safety by reporting real-time incidents.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to provide a centralized hub for knowledge, culture, and safety in Bangladesh. Whether you are a traveler, resident, or enthusiast, Bangladesh 2.0 offers valuable information at your fingertips.
          </p>
          <a
            href="/contact"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
