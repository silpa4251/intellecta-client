import { Link } from "react-router-dom";
import wcpagelogo from "../assets/wcpage-logo.svg"
import { MdLeaderboard } from "react-icons/md";


const WcNavbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-900 px-28 py-2">
      <div>
        <div className="flex justify-end gap-2 items-center text-white">
          <img src={wcpagelogo} alt="" className=" h-[45px]" />
          <div>
            <h1 className="text-2xl font-semibold">iNTELLECTA</h1>
            <h5 className="text-white">Learn, Grow, Success</h5>
          </div>
        </div>
      </div>
      <div className="space-x-5 text-white">
        <Link to="/">Home</Link>
        <Link to="/">Course</Link>
        <Link to="/">Games</Link>
        <Link to="/">Contact us</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white text-xl"><MdLeaderboard/></span>
        <img src="/login-bg.png" className="w-10 h-10 rounded-full" alt="" />
        <h4 className="text-white">username 🔽</h4>
      </div>
    </div>
  );
};

export default WcNavbar;
