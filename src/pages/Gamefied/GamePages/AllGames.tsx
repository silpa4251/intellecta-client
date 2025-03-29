import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../../store/useGameStore";
import { Link } from "react-router-dom";
import GameFooter from "./GameFooter";

const AllGames = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { games } = useGameStore();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) =>
        prevIndex === games.length - 1 ? 0 : prevIndex + 1
      );
      setProgress(0);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentGameIndex(index);
    setProgress(0);
  };

  return (
    <>
      <div className="mx-28 mt-10 pb-10">
        <div className="flex gap-4 h-[350px] transition-all duration-700">
          <motion.div
            key={currentGameIndex}
            initial={{ x: "2%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "20%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[100%]"
          >
          <Link to={`/games/${games[currentGameIndex]?.slug}`}>
            <div className="z-10 absolute mt-24 ml-5 max-w-sm p-5 space-y-5 text-white  rounded-xl">
              <h2 className="text-4xl font-semibold">
                {games[currentGameIndex]?.name}
              </h2>
              <p className="text-sm">{games[currentGameIndex]?.description}</p>
                <button className="bg-white text-black font-medium cursor-pointer py-2 px-8 rounded-xl shadow-lg transition-transform hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Play Now
                </button>
            </div>
            <img
              src={games[currentGameIndex]?.thumbnailImg}
              alt={`Game ${games[currentGameIndex]?.name}`}
              className="h-full w-full object-cover rounded-2xl opacity-70 z-0 transition-all duration-700 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
              />
              </Link>
          </motion.div>

          <div className="w-[30%] flex flex-col gap-0  rounded-2xl">
            {games?.slice(0, 5).map((item, index) => (
              <div
                onClick={() => handleDotClick(index)}
                className={`${
                  item.thumbnailImg === games[currentGameIndex].thumbnailImg
                    ? "bg-violet-800/20"
                    : "hover:bg-[#151565]/40"
                } p-3 relative rounded-xl flex cursor-pointer items-center gap-3 `}
              >
                {item.thumbnailImg === games[currentGameIndex].thumbnailImg && (
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600/20 z-0 transition-all rounded-xl duration-50 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <img
                  src={item.thumbnailImg}
                  alt="Game "
                  className="h-[65px] w-24 object-cover rounded-2xl hover:scale-105 transition duration-200 cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                />
                <h2 className="text-white text-lg">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg text-white mt-10 mb-5 font-semibold">
            LATEST RELEASES
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {games?.map((item) => (
              <Link to={`/games/${item.slug}`}>
                <img
                  src={item.thumbnailImg}
                  alt=""
                  className="h-60 w-[380px] object-cover rounded-2xl cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                />
                <h3 className="text-white text-lg ml-2 my-2">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <GameFooter />
    </>
  );
};

export default AllGames;
