import { useState, useEffect, useRef } from "react";
import wcpagelogo from "../../assets/wcpage-logo.svg";
import { MdLeaderboard, MdSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import axiosInstance from "../../utils/axiosInstance";
import { userEndPoints } from "../../api/endPoints/userEndPoints";
import { useQuery } from "@tanstack/react-query";
import student from "../../assets/Profile.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SpinningLoader from "../Loaders/SpinningLoader";

const fetchUser = async () => {
  const { data } = await axiosInstance.get(userEndPoints.USER.GET_PROFILE);
  return data.data.user;
};

const NavbarWelcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

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

  const handleLogout = async () => {
    try {
      console.log("Logging out");
      await axiosInstance.post(userEndPoints.USER.LOGOUT);
      toast.success("You are successfully logged out");
      navigate("/");
    } catch (error: any) {
      console.error("Error during logout:", error);
      const errorMessage = error.response?.data?.message || "Error logging user";
      toast.error(errorMessage);
    }
  };

  const handleProfileClick = () => {
    setLoading(true); 
    setIsOpen(false); 
    setTimeout(() => {
      navigate("/profile");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Full-Screen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
        <p className="mt-14 text-xl font-semibold text-gray-800">
          Loading your profile. Please wait...!
        </p>
      </div>
      )}

      <nav className="flex items-center justify-between bg-gray-900 px-6 md:px-28 py-3 relative">
        {/* Logo Section */}
        <div className="flex items-center gap-2 md:gap-3 text-white">
          <img src={wcpagelogo} alt="Logo" className="h-[30px] md:h-[40px]" />
          <div>
            <h1 className="text-sm md:text-xl font-semibold">iNTELLECTA</h1>
            <h5 className="text-gray-200 text-[10px] md:text-xs">Learn, Grow, Success</h5>
          </div>
        </div>

        {/* Right Side: Leaderboard, Profile */}
        <div className="flex items-center gap-4 relative">
          {/* Leaderboard Icon */}
          <span className="text-white text-2xl cursor-pointer">
            <MdLeaderboard />
          </span>

          {/* Profile Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={user?.profilePic || student}
              className="w-8 h-8 rounded-full cursor-pointer"
              alt="User Profile"
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 z-50">
                <ul className="py-2 text-gray-800">
                  <li>
                    <button
                      className="flex items-center gap-2 px-4 py-2 font-semibold text-left cursor-pointer w-full"
                      onClick={handleProfileClick}
                      disabled={loading}
                    >
                      <MdSettings className="text-xl" />
                      Profile Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-2 px-4 py-2 font-semibold text-left cursor-pointer w-full"
                      onClick={handleLogout}
                    >
                      <GoSignOut className="text-xl" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Username */}
          <h5 className="hidden md:block text-white font-semibold">{user?.name}</h5>
        </div>
      </nav>
    </>
  );
};

export default NavbarWelcome;
