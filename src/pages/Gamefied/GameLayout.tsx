import { Outlet } from "react-router-dom";
import fakeProfile from "../../assets/Review_1.jpg";
import { IoIosNotifications } from "react-icons/io";
import GameSidebar from "./GamePages/GameSidebar";
import { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";

const GamesLayout = () => {
  const { fetchGames } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, []);

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
        <div className="w-full ml-20 min-h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GamesLayout;
