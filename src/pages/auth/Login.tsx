import { Link } from "react-router-dom";
import IntellectaLogo from "../../assets/Intellecta-logo.svg";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="bg-[#FFEDAC] w-full h-screen">
      <div className="flex justify-center pt-10 max-w-7xl h-fit mx-auto">
        <motion.div
          initial={{ x: 450, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/2 h-[625px]"
        >
          <img
            src="/login-bg.png"
            className="rounded-l-xl w-full h-full"
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ x: -400, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-[#FFCB3D] w-1/2 h-[625px] rounded-r-xl p-5"
        >
          <div className="flex justify-end gap-2 items-center">
            <img src={IntellectaLogo} alt="" className="h-[35px]" />
            <div>
              <h1 className="text-xl font-semibold">iNTELLECTA</h1>
              <h5 className="text-black/50 text-sm">Learn, Grow, Success</h5>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-center mt-8">
              Your AI Tutor is Ready – Are You?
            </h2>
          </div>
          <form className="flex flex-col items-center">
            <div className="flex flex-col gap-10 justify-center items-center w-full mt-10">
              <div className="flex flex-col gap-10">
                <input
                  type="text"
                  className="border-b w-[400px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="border-b w-[400px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div className="cursor-pointer mt-12 p-2 shadow-[2.0px_3.0px_8.0px_rgba(0,0,0,0.38)] text-center bg-white rounded-4xl font-semibold w-[350px]">
              <Link to='/welcome'><button className=" text-base cursor-pointer">Let's Go</button></Link>
            </div>
            <div className="flex gap-2 mt-4">
              <h4 className="font-medium">New here? Join us today by</h4>
              <Link to="/register">
                <span className="font-medium text-blue-700">Sign up</span>
              </Link>
            </div>
            <h3 className="font-semibold mt-4">-OR-</h3>
            <div className="cursor-pointer mt-4 p-2 shadow-[2.0px_3.0px_8.0px_rgba(0,0,0,0.38)] text-center bg-white rounded-4xl font-semibold w-[350px]">
              <img
                src="/google-logo.png "
                className="cursor-pointer absolute h-7 ml-[55px] -mt-[2px]"
                alt=""
              />
              <button className="cursor-pointer text-base">
                Continue With Google
              </button>
            </div>
            <h4 className="font-medium pt-4">
              Your Smart Learning Journey Starts Here!
            </h4>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
