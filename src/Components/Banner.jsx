export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://i.ibb.co/7VfXk1L/bangladesh-river.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Bangladesh 2.0
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-xl">
          Explore the beauty, culture, and vibrant life of Bangladesh. Discover tourism spots, stay informed, and contribute to your community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/tourism"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded transition"
          >
            Explore Tourism
          </a>
          <a
            href="/crime"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded transition"
          >
            Report a Crime
          </a>
        </div>
      </div>
    </section>
  );
}
