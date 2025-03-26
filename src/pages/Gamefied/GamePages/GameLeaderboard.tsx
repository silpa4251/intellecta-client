

const LeaderboardPreview = () => {
  const topPlayers = [
    { rank: 1, name: "PlayerOne", score: 1500 },
    { rank: 2, name: "GamerX", score: 1400 },
    { rank: 3, name: "QueenBee", score: 1320 },
    { rank: 4, name: "Shadow", score: 1280 },
    { rank: 5, name: "Blaze", score: 1230 },
    { rank: 6, name: "Ninja", score: 1190 },
    { rank: 7, name: "Dragon", score: 1150 },
    { rank: 8, name: "Ace", score: 1100 },
    { rank: 9, name: "Storm", score: 1070 },
    { rank: 10, name: "Bolt", score: 1030 },
  ];

  return (
    <div className="min-h-screen mx-28 py-10 ">
      <div className="flex items-center w-full mx-auto mb-8">
        <div className="flex-grow h-px bg-white/30 "></div>
        <div className="px-4 text-white text-3xl font-bold text-center">
          Leaderboard
        </div>
        <div className="flex-grow h-px bg-white/30"></div>
      </div>

      <div className="max-w-6xl mx-auto max-h-[800px] custom-scrollbar overflow-y-auto bg-[#0f1f4c] rounded-2xl shadow-2xl">
        <table className=" w-full text-white/90 table-auto border-collapse">
          <thead>
            <tr className="sticky top-0 bg-[#0a173b] border-b border-white/20 text-lg">
              <th className="p-4 text-left w-1/12">Rank</th>
              <th className="p-4 text-left w-1/4">Game</th>
              <th className="p-4 text-left w-1/4">Player</th>
              <th className="p-4 text-left w-1/5">Total Time Played</th>
              <th className="p-4 text-left w-1/5">Last Played</th>
              <th className="p-4 text-right w-1/5">Score</th>
            </tr>
          </thead>
          <tbody className="">
            {topPlayers.map((player) => (
              <tr
                key={player.rank}
                className=" border-b border-white/10 hover:bg-white/5 transition duration-200"
              >
                <td className="py-4 px-3 align-middle font-bold text-lg text-yellow-400">
                  #{player.rank}
                </td>

                <td className="py-4 px-3 align-middle">
                  <div className="flex items-center gap-3">
                    <img
                      src="home-bg.png"
                      className="h-10 w-10 rounded-full object-cover shadow-md"
                      alt="Game"
                    />
                    <span className="font-medium">Game Name</span>
                  </div>
                </td>

                <td className="py-4 px-3 align-middle">
                  <div className="flex items-center gap-3">
                    <img
                      src="login-bg.png"
                      alt="Player"
                      className="h-10 w-10 rounded-full object-cover shadow-md"
                    />
                    <span className="font-medium">{player.name}</span>
                  </div>
                </td>

                <td className="py-4 px-3 align-middle">
                  {467 - player.rank * 10} hrs
                </td>
                <td className="py-4 px-3 align-middle">13/4/2024</td>
                <td className="py-4 px-3 text-right align-middle font-semibold">
                  {player.score}
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
