import { useQuery } from "@tanstack/react-query";
import GameDpImage from "../../../assets/game/dpgame.png";
import violetemerald from "../../../assets/game/violet-emerald.png";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

const GameProfile = () => {
  const { user } = useAuthStore();

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
  console.log(userstats);

  return (
    <div className="flex gap-10 py-5 md:mx-28">
      <div className="space-y-5">
        <div className="flex flex-col items-center h-[350px] rounded-xl bg-[#111827] text-white text-center shadow-lg ">
          <img src={GameDpImage} alt="" className="h-44" />
          <div>
            <div className="flex items-center gap-1">

            <img src={violetemerald} alt="" className="h-10"/>
            <h1 className="text-3xl font-semibold">54.32</h1>
            </div>
            <p>Total Score</p>
          </div>
          <div className="flex gap-10">
            <div>
              <h4>1215</h4>
              <span>Total points</span>
            </div>
            <div>
              <h4>215</h4>
              <span>Total Winnings</span>
            </div>
            <div>
              <h4>5</h4>
              <span>Total loses</span>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[230px] p-6 rounded-xl bg-gray-800 text-center shadow-lg"></div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center text-white gap-4">
          <img
            src={user?.profilePic}
            alt=""
            className="h-20 w-20 bg-red-100 object-contain rounded-full"
          />
          <div>
            <h2 className="text-gray-400 font-semibold text-lg">WELCOME</h2>
            <h1 className="font-semibold text-3xl">{user?.name}</h1>
          </div>
        </div>
        <div className="flex gap-8 text-white">
          <div className="p-6 rounded-xl bg-gray-800 space-y-2 shadow-lg">
            <p className="text-gray-500">TOTAL TIME SPENT</p>
            <h1 className="font-semibold text-3xl">5665</h1>
          </div>
          <div className=" p-6 rounded-xl bg-gray-800 space-y-2 shadow-lg">
            <p className="text-gray-500">TOTAL GAMES PLAYED</p>
            <h1 className="font-semibold text-3xl">5665</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameProfile;
