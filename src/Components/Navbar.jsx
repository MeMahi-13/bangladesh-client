// src/components/Navbar.jsx
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user"); // optional if using localStorage
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const userPhoto = user?.photoURL || "https://via.placeholder.com/40";
  const userName = user?.displayName || "User";

  return (
    <nav className="relative  bg-[#1B3C53] shadow-sm text-white flex justify-between items-center px-4 py-3">
      {/* Branding */}
      <div className="flex items-center gap-2">
        <img
          className="border-2 border-green-900 rounded-full h-14 w-14"
          src="https://i.postimg.cc/023HjjHv/logo.png"
          alt="Logo"
        />
        <h1 className="sirivennela-regular text-4xl font-bold">Prohori</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex font-bold text-[15px] space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crime">Report A Crime</Link></li>
        <li><Link to="/emergency">Emergency Help</Link></li>
        <li><Link to="/lostfound">Lost & Found</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Desktop Auth */}
      <div className="hidden lg:flex gap-5 items-center">
        {user ? (
          <>
            <div className="flex items-center gap-3">
              <img
                src={userPhoto}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="font-medium">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="border-2 border-red-600 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="border-2 border-lightblue px-5 py-2 rounded-xl hover:bg-lightblue hover:text-blue"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border-2 border-lightblue px-5 py-2 rounded-xl hover:bg-lightblue hover:text-blue"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#1B3C53] text-white shadow-lg overflow-hidden transition-all duration-300 z-50 ${
          isMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/crime" onClick={() => setIsMenuOpen(false)}>Report A Crime</Link></li>
          <li><Link to="/emergency" onClick={() => setIsMenuOpen(false)}>Emergency Help</Link></li>
          <li><Link to="/lostfound" onClick={() => setIsMenuOpen(false)}>Lost & Found</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          {user ? (
            <>
              <li className="flex items-center gap-3">
                <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full border" />
                <span>{userName}</span>
              </li>
              <li>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full border-2 border-red-600 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full border-2 border-lightblue px-4 py-2 rounded-xl hover:bg-lightblue hover:text-blue text-center">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full border-2 border-lightblue px-4 py-2 rounded-xl hover:bg-lightblue hover:text-blue text-center">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
