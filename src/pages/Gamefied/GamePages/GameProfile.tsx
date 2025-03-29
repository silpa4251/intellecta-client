import GameDpImage from "../../../assets/game/dpgame.png";

const GameProfile = () => {
  return (
    <div className="px-10 py-5">
      <div className="max-w-xs space-y-5">
        <div className="flex flex-col items-center h-[350px] rounded-xl bg-[#111827] text-white text-center shadow-lg ">
          <img src={GameDpImage} alt=""  className="h-44"/>
          <div>
            <h1 className="text-3xl font-semibold">54.32</h1>
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
      <div></div>
      <div></div>
    </div>
  )
}

export default GameProfile