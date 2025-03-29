import { Outlet, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import GameSidebar from "./GamePages/GameSidebar";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { userEndPoints } from "../../api/endPoints/userEndPoints";
import axios from "axios";

const GamesLayout = () => {
  const { fetchGames, fetchLeaderboard, games } = useGameStore();
  const { setUser, user } = useAuthStore();
  const navigate= useNavigate()

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(userEndPoints.USER.GET_PROFILE);
      setUser(data.data.user);
      return data.data.user;
    },
  });

  const { data: userstats } = useQuery({
    queryKey: ["fetchUserleaderboard"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5002/api/games/userbyid/leaderboard",
        { withCredentials: true }
      );
      return res.data?.leaderboard || {};
    },
    enabled: !!user,
  });

  useEffect(() => {
    fetchGames();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const [searchVal, setSearchVal] = useState("");
  const searchedGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchVal.toLocaleLowerCase())
  );

  const handleGame =(slug:string)=> {
    navigate(`/games/${slug}`)
    setSearchVal("")
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#0b2672] to-[#111827]">
      <nav className="flex justify-between px-10 py-4  ml-16 text-white ">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-xl">Intellecta</h1>
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search games"
            className="rounded-3xl pl-4 outline-0 h-10 my-auto
            shadow-md
            placeholder-gray-400 text-white
            bg-white/10
            font-medium
            backdrop-blur-sm"
          />
        </div>
        {searchVal && (
          <div className="absolute top-16 left-62 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-lg shadow-lg">
            {searchedGames.map((item) => (
                <div
                onClick={()=> handleGame(item.slug)}
                  key={item.name}
                  className="py-2 px-3 z-50 hover:bg-gray-700 rounded-md transition"
                >
                  {item.name}
                </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-5">
          <div className="rounded-full h-8 w-8 p-2 bg-sky-800 flex items-center justify-center">
            <span className="text-xl">
              <IoIosNotifications />
            </span>
          </div>
          <div className="rounded-3xl min-w-20 space-x-2 px-3 py-1 bg-sky-800">
            <span className="text-sm text-green-300 border-r border-r-gray-400 pr-1">
              ${" "}
            </span>
            <span className="text-sm font-semibold">
              {userstats?.totalScore || 0}
            </span>
          </div>
          <div>
            <img
              src={user?.profilePic || "/home-bg.png"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
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
