import { useState } from 'react';
import { Link } from 'react-router';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-gradient-to-r from-emerald-700 to-teal-500 shadow-sm flex justify-between items-center px-4">
      {/* Branding */}
      <div className="navbar-start">
        <Link to="/" className="text-xl text-white font-bold">Bangladesh 2.0</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/medical">Medical</Link></li>
          <li><Link to="/tourism">Tourism</Link></li>
          <li><Link to="/crime">Crime Report</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Call-to-Action Button */}
      <div className="navbar-end hidden lg:flex">
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-lg lg:hidden">
          <ul className="menu menu-vertical p-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/medical">Medical</Link></li>
            <li><Link to="/tourism">Tourism</Link></li>
            <li><Link to="/crime">Crime Report</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login" className="btn btn-primary mt-2">Login</Link></li>
          </ul>
        </div>
        
      )}
      <ThemeToggle/>
    </nav>
  );
};

export default Navbar;
