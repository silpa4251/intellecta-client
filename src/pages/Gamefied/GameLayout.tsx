import { Outlet } from "react-router-dom";
import fakeProfile from "../../assets/Review_1.jpg";
import { IoIosNotifications } from "react-icons/io";
import GameSidebar from "./GamePages/GameSidebar";

const GamesLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-l from-[#0b2672] to-[#111827]">
      <nav className="flex justify-between px-10 py-4  ml-16 text-white ">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-xl">Intellecta</h1>
          </div>
          <input
            type="text"
            placeholder="Search games"
            className="rounded-3xl pl-4 outline-0 h-10 my-auto
            shadow-md
            placeholder-gray-400 text-white
            bg-white/10
            font-medium
            backdrop-blur-sm"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="rounded-full h-8 w-8 p-2 bg-sky-800 flex items-center justify-center">
            <span className="text-xl">
              <IoIosNotifications />
            </span>
          </div>
          <div className="rounded-3xl min-w-20 space-x-2 px-3 py-1 bg-sky-800">
            <span className="text-sm border-r border-r-gray-400 pr-1">$ </span>
            <span className="text-sm">4500</span>
          </div>
          <div>
            <img src={fakeProfile} alt="" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>
      <div className="flex">
        <GameSidebar />
        <div className="w-full ml-20 min-h-screen">
          <Outlet />
        </div>
      </div>
      <div>
        <footer className="bg-[#0f172a] text-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">GameZone</h2>
              <p className="text-sm text-gray-400">
                Dive into a world of fun and competition. Play, climb the ranks,
                and become a legend!
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/games" className="hover:text-violet-400 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/games/allgames"
                    className="hover:text-violet-400 transition"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="/games/leaderboard"
                    className="hover:text-violet-400 transition"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="/games/myprofile"
                    className="hover:text-violet-400 transition"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-violet-400 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-violet-400 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-violet-400 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-violet-400 transition">
                  <i className="fab fa-discord"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-2">
                Get updates on new games and tournaments.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition"
              />
              <button className="mt-3 w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg">
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 py-4 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GameZone. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GamesLayout;
