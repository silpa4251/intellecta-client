import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";
import UserProfileCard from "./UserProfileCard";
import { Link } from "react-router-dom";
import { formatTime } from "./LeaderboardPreview";
import beginnerTrophy from "../../../assets/game/beginner.png";
import gamerTrophy from "../../../assets/game/gamer.png";
import marathonerTrophy from "../../../assets/game/marathoner.png";
import proplayerTrophy from "../../../assets/game/pro-player.png";
import legendTrophy from "../../../assets/game/legend.png";
import RotatingCard from "../../../utils/ui/RotatingCards";

interface UserRecentGamesType {
  _id: string;
  thumbnailImg: string;
  name: string;
  difficulty: string;
  score: number;
}

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

  const badgeTrophies = [
    { id: 1, badge: "Beginner", trophysrc: beginnerTrophy , desc: "Played your first game!"},
    { id: 2, badge: "Gamer", trophysrc: gamerTrophy , desc: "Played 10 or more games!"},
    { id: 3, badge: "Marathoner", trophysrc: marathonerTrophy, desc: "Played for over 1 hour in total!" },
    { id: 4, badge: "Pro Player", trophysrc: proplayerTrophy , desc: "Scored over 100 points!"},
    { id: 5, badge: "Legend", trophysrc: legendTrophy, desc: "Scored over 500 points!" },
  ];

  const { data: userRecentGames, isLoading } = useQuery({
    queryKey: ["userRecentgame"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5002/api/games/latest/recent-game",
        { withCredentials: true }
      );
      return res.data?.games || [];
    },
    enabled: !!user,
  });

  return (
    <div className="flex gap-10 py-5 md:mx-28">
      {user ? (
        <>
          <div className="space-y-5">
            <UserProfileCard user={user} userstats={userstats} />
            <div className="w-[300px] h-[230px] p-6 rounded-xl border-2 border-gray-800 bg-[#070e1f]"></div>
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
                <h1 className="font-semibold text-3xl capitalize">
                  {user?.name}
                </h1>
              </div>
            </div>
            <div className="flex gap-8 text-white">
              <div className=" p-6 rounded-xl brounded-xl border-2 border-gray-800 bg-[#070e1f]">
                <p className="text-gray-500">TOTAL TIME SPEND</p>
                <h1 className="font-semibold text-3xl">
                  {(userstats?.totalTimePlayed &&
                    formatTime(userstats?.totalTimePlayed)) ||
                    0}
                </h1>
              </div>
              <div className="p-6 rounded-xl border-2 border-gray-800 bg-[#070e1f]">
                <p className="text-gray-500">TOTAL GAMES PLAYED</p>
                <h1 className="font-semibold text-3xl">
                  {userstats?.gamesPlayed || 0}
                </h1>
              </div>
            </div>
            <div>
              <h2 className="text-xl text-white font-medium mt-10">
                Recently Played games
              </h2>
              <div className="min-h-4fygh4 mt-5 w-full max-w-3xl mx-auto rounded-xl border-2 border-gray-800 bg-[#070e1f] p-4">
                <div className="grid grid-cols-3 text-white text-sm font-semibold border-b border-gray-600 pb-2">
                  <div className="text-left">Game</div>
                  <div className="text-center">Difficulty</div>
                  <div className="text-center">Score</div>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-around">
                    <div className="loader">
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__bar"></div>
                      <div className="loader__ball"></div>
                    </div>
                  </div>
                ) : (
                  userRecentGames &&
                  userRecentGames.map((game: UserRecentGamesType) => (
                    <div
                      key={game._id}
                      className={`grid grid-cols-3 items-center py-3 text-gray-300 text-sm`}
                    >
                      <div className="flex items-center gap-5 text-left font-medium">
                        <img
                          src={game?.thumbnailImg}
                          alt={game.name}
                          className="w-12 h-12 object-cover rounded-md shadow"
                        />
                        <p>{game.name}</p>
                      </div>
                      <div className="text-center capitalize">
                        {game.difficulty}
                      </div>
                      <div className="text-center capitalize">{game.score}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 h-fit gap-4">
            {userstats?.badges.map((badge: any, index:number) => {
              const filtered = badgeTrophies.find(
                (trophy) => trophy.badge === badge
              );
              return (
                <div key={index} className="b">
                  {filtered && <RotatingCard badges={filtered} badge={badge} />}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full mt-20">
          <h1 className="text-4xl text-white">
            Please login to see the Profile.
            <Link
              to="/login"
              className="ml-1 underline text-blue-400 undrline text-sm"
            >
              <span>Login now</span>
              <div className="flex justify-center items-center w-full">
                <div className="loader ">
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__bar"></div>
                  <div className="loader__ball"></div>
                </div>
              </div>
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default GameProfile;
