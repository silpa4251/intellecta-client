import React from "react";
import { games } from "./GameHome";

const AllGames = () => {
  return (
    <div className="mx-28 mt-10">
      <div className="flex gap-3 h-[350px]">
        <img
          src={games[1].image}
          alt=""
          className="h-full w-full object-cover rounded-2xl cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
        />

        <div className="w-[50%] h-full space-y-4">
          <div className="p-5 space-y-5 h-[70%] text-white bg-gradient-to-r from-[#1b3683] to-[#1b3683] rounded-xl">
          {/* <div className="p-5 space-y-5 h-[70%] text-white bg-linear-to-r to-purple-800 via-indigo-800 from-blue-900 rounded-xl"> */}
            <h2 className="text-2xl">Memory Game</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut
              cumque assumenda possimus minima. Totam, rerum rem eaque earum eum
              alias illum ese facilis ea ad placeat, fugit quos qui.
            </p>
            <button
              className="bg-gradient-to-r from-purple-500/70 via-indigo-500/50 to-blue-500/70 
             text-white font-semibold py-2 px-6 rounded-xl 
             shadow-lg transition-transform  
             hover:shadow-xl focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-indigo-500"
            >
              Play Now
            </button>
          </div>
          <div className="flex gap-5 h-[25%]">
            <img
              src={games[1].image}
              alt=""
              className=" w-full object-cover rounded-2xl cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            />
            <img
              src={games[0].image}
              alt=""
              className=" w-full object-cover rounded-2xl cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg text-white my-5">Latest Releases</h2>
        <div className="grid grid-cols-3 gap-8">
          {games.map((item) => (
            <img
              src={item.image}
              alt=""
              className="h-60 w-[380px] object-cover rounded-2xl hover:scale-105 transition duration-200 cursor-pointer shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGames;
