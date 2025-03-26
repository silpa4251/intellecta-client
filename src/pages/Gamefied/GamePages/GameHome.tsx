import GameController from "../../../assets/game/controller.png";
import { useGameStore } from "../../../store/useGameStore";
import GameFooter from "./GameFooter";
import LeaderboardPreview from "./LeaderboardPreview";
import { Link } from "react-router-dom";

const GameHome = () => {
  const { games } = useGameStore();

  return (
    <>
      <div className="p-5 mx-28">
        <div className="flex justify-between  mt-10">
          <div className="max-w-md space-y-3">
            <h3 className="text-violet-800 text-lg font-bold">
              EXPLORE OUR GAMES
            </h3>
            <h1 className="text-6xl text-white font-semibold">
              Play. Compete. Conquer.
            </h1>
            <p className="text-gray-200">
              Jump into a world of exciting games, daily challenges, and
              real-time leaderboards. Whether you're here to have fun or climb
              the ranks, the adventure starts now.
            </p>
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-xl cursor-pointer
             shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
             transform hover:scale-105"
            >
              Explore Games
            </button>
          </div>
          <div>
            <img
              src={GameController}
              alt="Game Controller"
              className="max-w-xl relative bottom-16 transition-transform duration-700  ease-in-out hover:rotate-12 hover:scale-90"
            />
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-medium mb-4">
            Recently Played
          </h2>
          <div>
            <div className="absolute mt-10 ml-10 z-10 space-y-2">
              <h1 className="text-3xl text-white font-semibold">
                Almost there!
              </h1>
              <p className="text-white">
                Your last game is still in progress. Finish it now and claim
                your rewards!
              </p>
              {/* <Link to={``}> */}
              <button
                className="mt-5 bg-gradient-to-r from-blue-700 via-violet-700 to-purple-800
              text-white font-bold py-2 px-8 rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
              hover:from-blue-800 hover:to-purple-900"
              >
                Play Now
              </button>
              {/* </Link> */}
            </div>
            <img
              src={games[0]?.thumbnailImg}
              alt=""
              className="h-72 w-full object-cover opacity-70 z-0 rounded-2xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between">
            <h2 className="text-white text-lg font-medium mb-4">
              Featured Games
            </h2>
            <p className="text-white mr-2 cursor-pointer">view all</p>
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-8">
              {games?.map((item) => (
                <Link to={`/games/${item.slug}`} key={item._id}>
                  <img
                    src={item.thumbnailImg}
                    alt=""
                    className="h-60 w-[380px] object-cover rounded-2xl hover:scale-105 transition duration-200 cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <LeaderboardPreview />
      </div>
      <GameFooter/>
    </>
  );
};

export default GameHome;
