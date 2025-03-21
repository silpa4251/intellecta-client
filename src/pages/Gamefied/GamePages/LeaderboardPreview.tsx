import { FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeaderboardPreview = () => {
  const topPlayers = [
    { rank: 1, name: "PlayerOne", score: 1500 },
    { rank: 2, name: "GamerX", score: 1400 },
    { rank: 3, name: "QueenBee", score: 1320 },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center w-full mx-auto my-4">
        <div className="flex-grow h-px bg-white/30"></div>
        <div className="px-4 text-white text-lg font-semibold text-center">
          Top Players
        </div>
        <div className="flex-grow h-px bg-white/30"></div>
      </div>

      <div className="mt-10  bg-[#0f1f4c]  p-5 rounded-xl shadow-lg">
        <table className="w-full text-sm text-white/90 table-auto">
          <thead>
            <tr className="border-b border-white/20">
              <th className="pb-3 text-left w-1/12">Rank</th>
              <th className="pb-3 text-left w-1/4">Game</th>
              <th className="pb-3 text-left w-1/4">Player</th>
              <th className="pb-3 text-left w-1/5">Total Time Played</th>
              <th className="pb-3 text-left w-1/5">Last Played</th>
              <th className="pb-3 text-right w-1/5">Score</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => (
              <tr
                key={player.rank}>
                <td className="py-3 px-2 align-middle ">#{player.rank}</td>

                <td className="py-3 px-2 align-middle">
                  <div className="flex items-center gap-2">
                    <img
                      src="home-bg.png"
                      className="h-8 w-8 rounded-full object-cover"
                      alt="Game"
                    />
                    <span>Game Name</span>
                  </div>
                </td>

                <td className="py-3 px-2 align-middle">
                  <div className="flex items-center gap-2">
                    <img
                      src="login-bg.png"
                      alt="Player"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span>{player.name}</span>
                  </div>
                </td>

                <td className="py-3 px-2 align-middle">467 hrs</td>
                <td className="py-3 px-2 align-middle">13/4/2024</td>
                <td className="flex py-3 px-2 text-right align-middle">
                  {player.score}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
