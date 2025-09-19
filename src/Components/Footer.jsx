import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1B3C53] text-white py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <img className="h-20 w-20 rounded-full" src="https://i.postimg.cc/023HjjHv/logo.png" alt="" />
          <h3 className="sirivennela-regular text-4xl font-bold mb-4">Prohori</h3>
          <p className="text-gray-300">
            Empowering citizens with fast crime reporting and instant access to emergency services across Bangladesh. Together, we can build safer communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-yellow-400 transition-colors">Report Crime</Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-yellow-400 transition-colors">Emergency Help</Link>
            </li>
            <li>
              <Link to="/lost" className="hover:text-yellow-400 transition-colors">Lost & Found</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Emergency Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact & Emergency</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>Police: 999</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>Ambulance: 199</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>Fire Service: 998</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>support@securebd.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Secure Bangladesh. All rights reserved.
      </div>
    </footer>
  );
}
