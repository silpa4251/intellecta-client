import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger & close icons
import logo from "../../assets/Logo.svg";

const LandingNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black/60 text-white py-4 px-6 md:px-12 flex justify-between items-center">      
      {/* Logo Section */}
      <div className="ml-12 flex items-center text-white">
        <img src={logo} alt="Intellecta Logo" className="h-10 mr-3" /> 
        <div>
          <h1 className="text-xl font-bold">iNTELLECTA</h1>
          <p className="text-sm text-gray-300">Learn, Grow, Succeed</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 text-lg mr-12">
        <li><a href="#home" className="hover:text-gray-400 font-semibold">Home</a></li>
        <li><a href="#works" className="hover:text-gray-400 font-semibold">Quick Guide</a></li>
        <li><a href="#about" className="hover:text-gray-400 font-semibold">About Us</a></li>
        <li><a href="#footer" className="hover:text-gray-400 font-semibold">Contact Us</a></li>
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center py-6 space-y-4 shadow-md md:hidden">
          <li><a href="#" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Quick Guide</a></li>
          <li><a href="#" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>About Us</a></li>
          <li><a href="#" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Contact Us</a></li>
        </ul>
      )}
      
    </nav>
  );
};

export default LandingNavbar;
