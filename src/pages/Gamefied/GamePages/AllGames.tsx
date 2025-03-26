import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../../store/useGameStore";
import { Link } from "react-router-dom";

import game1 from "../../../assets/game/game1.webp";
import game2 from "../../../assets/game/game2.webp";
import game3 from "../../../assets/game/game3.webp";
import game4 from "../../../assets/game/game4.webp";
import game5 from "../../../assets/game/game5.webp";
import game6 from "../../../assets/game/game6.webp";
import game7 from "../../../assets/game/game7.webp";
import game8 from "../../../assets/game/game8.webp";

import GameFooter from "./GameFooter";

const upcominggames = [
  {
    _id: "1",
    name: "Tic Tac Future",
    slug: "tic-tac-future",
    description:
      "A futuristic spin on the classic Tic Tac Toe. Outsmart your opponent in style.",
    thumbnailImg: game1,
    difficulty: "Easy",
    createdAt: new Date("2025-03-01"),
  },
  {
    _id: "2",
    name: "Memory Matrix",
    slug: "memory-matrix",
    description:
      "Engage your brain with an intense memory challenge. Match all pairs to win.",
    thumbnailImg: game2,
    difficulty: "Medium",
    createdAt: new Date("2025-03-03"),
  },
  {
    _id: "3",
    name: "Math Invaders",
    slug: "math-invaders",
    description:
      "Defend your base by solving math problems quickly. The fate of the galaxy depends on you.",
    thumbnailImg: game3,
    difficulty: "Hard",
    createdAt: new Date("2025-03-05"),
  },
  {
    _id: "4",
    name: "Word Galaxy",
    slug: "word-galaxy",
    description:
      "Explore the universe of words. Form constellations of vocabulary in this cosmic word game.",
    thumbnailImg: game4,
    difficulty: "Medium",
    createdAt: new Date("2025-03-07"),
  },
  {
    _id: "5",
    name: "Puzzle Reactor",
    slug: "puzzle-reactor",
    description:
      "Solve complex puzzles to stabilize the reactor. Every move counts in this tense puzzle game.",
    thumbnailImg: game5,
    difficulty: "Hard",
    createdAt: new Date("2025-03-09"),
  },
  {
    _id: "6",
    name: "Shape Shifter",
    slug: "shape-shifter",
    description:
      "Match and shift shapes to complete intricate patterns. Speed and precision are key.",
    thumbnailImg: game6,
    difficulty: "Easy",
    createdAt: new Date("2025-03-11"),
  },
  {
    _id: "7",
    name: "Code Cracker",
    slug: "code-cracker",
    description:
      "Crack secret codes and unlock hidden messages in this cryptographic adventure.",
    thumbnailImg: game7,
    difficulty: "Hard",
    createdAt: new Date("2025-03-13"),
  },
  {
    _id: "8",
    name: "Color Dash",
    slug: "color-dash",
    description:
      "Race against time to match colors and patterns. A vibrant test of reflexes.",
    thumbnailImg: game8,
    difficulty: "Medium",
    createdAt: new Date("2025-03-15"),
  },
];

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
            <div className="z-10 absolute mt-24 ml-5 max-w-sm p-5 space-y-5 text-white  rounded-xl">
              <h2 className="text-4xl font-semibold">
                {games[currentGameIndex]?.name}
              </h2>
              <p className="text-sm">{games[currentGameIndex]?.description}</p>
              <Link to={`/games/${games[currentGameIndex]?.slug}`}>
                <button className="bg-white text-black font-medium cursor-pointer py-2 px-8 rounded-xl shadow-lg transition-transform hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Play Now
                </button>
              </Link>
            </div>
            <img
              src={games[currentGameIndex]?.thumbnailImg}
              alt={`Game ${games[currentGameIndex]?.name}`}
              className="h-full w-full object-cover rounded-2xl opacity-70 z-0 transition-all duration-700 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            />
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
        <div>
          <h2 className="text-lg text-white mt-10 mb-5 font-semibold">
            UPCOMING GAMES
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {upcominggames?.map((item) => (
              <Link to={`/games/${item.slug}`}>
                <img
                  src={item.thumbnailImg}
                  loading="lazy"
                  alt=""
                  className="h-60 w-[380px] object-cover rounded-2xl cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                />
                <h3 className="text-gray-300 text-lg ml-2 my-2">{item.name}</h3>
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
