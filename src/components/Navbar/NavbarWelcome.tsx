import { useState, useEffect, useRef } from "react";
import wcpagelogo from "../../assets/wcpage-logo.svg";
import { MdLeaderboard, MdSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

const NavbarWelcome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-900 px-28 py-3 relative">
      {/* Logo Section */}
      <div className="flex justify-end gap-2 items-center text-white">
        <img src={wcpagelogo} alt="Logo" className="h-[45px]" />
        <div>
          <h1 className="text-xl font-semibold">iNTELLECTA</h1>
          <h5 className="text-white text-sm">Learn, Grow, Success</h5>
        </div>
      </div>

      {/* <ul className="hidden md:flex gap-8 text-base mr-12 text-white">
        <li><a href="#home" className="hover:text-gray-400 py-1 hover:border-b-2 border-white font-semibold">Home</a></li>
        <li><a href="#works" className="hover:text-gray-400 py-1 hover:border-b-2 border-white font-semibold">Quick Guide</a></li>
        <li><a href="#about" className="hover:text-gray-400 py-1 hover:border-b-2 border-white font-semibold">About Us</a></li>
        <li><a href="#footer" className="hover:text-gray-400 py-1 hover:border-b-2 border-white font-semibold">Contact Us</a></li>
      </ul> */}

      {/* Right Side: Leaderboard, Profile */}
      <div className="flex items-center gap-4 relative">
        <span className="text-white text-2xl">
          <MdLeaderboard />
        </span>

        {/* Profile Image (Click to Toggle Dropdown) */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="/login-bg.png"
            className="w-8 h-8 rounded-full cursor-pointer"
            alt="User Profile"
            onClick={() => setIsOpen(!isOpen)}
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200">
              <ul className="py-2 text-gray-800">
                <li>
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 font-semibold text-left">
                  <MdSettings className="text-xl"/>Profile Settings
                  </a>
                </li>
                <li>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 font-semibold text-left" onClick={() => alert("Logged Out")}>
                  <GoSignOut className="text-xl"/>Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <h4 className="text-white font-semibold">Jerry Hardy</h4>
      </div>
    </div>
  );
};

export default NavbarWelcome;
