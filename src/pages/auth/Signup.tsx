import { Link } from "react-router-dom";
import IntellectaLogo from "../../assets/Intellecta-logo.svg";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="bg-[#FFEDAC] w-full h-screen">
      <div className="flex justify-center pt-10 max-w-7xl h-fit mx-auto">
        <motion.div
          initial={{ x: 350, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-[#FFCB3D] w-1/2 z-10 h-[625px] rounded-l-3xl p-10"
        >
          <div className="flex gap-2 items-center">
            <img src={IntellectaLogo} alt="" className="h-[45px]" />
            <div>
              <h1 className="text-2xl font-semibold">iNTELLECTA</h1>
              <h5 className="text-black/50">Learn, Grow, Success</h5>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-center mt-5">
              Transform the Way You Learn!
            </h2>
          </div>
          <form className="flex flex-col items-center">
            <div className="flex flex-col gap-10 justify-center items-center w-full mt-10">
              <div className="space-x-14 ">
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Last Name"
                />
              </div>
              <div className="space-x-14">
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="space-x-14">
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  className="border-b w-[250px] border-b-black/50 pl-2 pb-2 outline-none"
                  placeholder="Create Password"
                />
              </div>
            </div>
            <div className="cursor-pointer mt-8 p-2 shadow-[2.0px_3.0px_8.0px_rgba(0,0,0,0.38)] text-center bg-white rounded-4xl font-semibold w-[350px]">
              <button className=" text-base cursor-pointer">Join Now</button>
            </div>
            <div className="flex gap-2 mt-2">
              <h4 className="font-medium">Already have an account ?</h4>
              <Link to="/login">
                <span className="font-medium text-blue-700">Sign In</span>
              </Link>
            </div>
            <h3 className="font-semibold">-OR-</h3>
            <div className="cursor-pointer mt-3 p-2 shadow-[2.0px_3.0px_8.0px_rgba(0,0,0,0.38)] text-center bg-white rounded-4xl font-semibold w-[350px]">
              <img
                src="/google-logo.png "
                className="cursor-pointer absolute h-7 ml-[70px] -mt-[2px]"
                alt=""
              />
              <button className="cursor-pointer text-base">
                Join With Google
              </button>
            </div>
            <h4 className="font-medium pt-3">
              Join Intellecta & Unlock Your Potential!
            </h4>
          </form>
        </motion.div>
        <motion.div
          initial={{ x: -350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/2 h-[625px]"
        >
          <img src="/signup-bg.png" className="rounded-r-3xl" alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
