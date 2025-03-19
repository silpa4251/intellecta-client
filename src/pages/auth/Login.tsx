import { Link } from "react-router-dom";
import IntellectaLogo from "../../assets/Intellecta-logo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
// import { userEndPoints } from "../../api/endPoints/userEndPoints";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFEDAC] w-full min-h-screen flex justify-center items-center p-4">
  <div className="flex flex-col md:flex-row max-w-7xl w-full rounded-xl overflow-hidden">
    
    {/* Left Section (Image - Hidden on Mobile) */}
    <motion.div
      initial={{ x: 450, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:block w-1/2 h-full"
    >
      <img src="/login-bg.png" className="w-full h-full object-cover" alt="" />
    </motion.div>

    {/* Right Section (Login Form) */}
    <motion.div
      initial={{ x: -400, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-[#FFCB3D] w-full md:w-1/2 p-6 md:p-8"
    >
      {/* Logo */}
      <div className="flex justify-end gap-2 items-center">
        <img src={IntellectaLogo} alt="Logo" className="h-[35px]" />
        <div>
          <h1 className="text-xl font-semibold">iNTELLECTA</h1>
          <h5 className="text-black/50 text-sm">Learn, Grow, Success</h5>
        </div>
      </div>

      <div className="mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Your AI Tutor is Ready – Are You?
        </h2>
      </div>

      {/* Login Form */}
      <form className="flex flex-col items-center w-full mt-6">
        <div className="flex flex-col gap-6 items-center w-full">
          
          {/* Email & Password Fields */}
          <div className="flex flex-col gap-6 items-center w-full md:mt-8">
            <input
              type="text"
              className="border-b w-full md:w-[400px] border-b-black/50 pl-2 pb-2 outline-none"
              placeholder="Email"
            />
            <input
              type="password"
              className="border-b w-full md:w-[400px] border-b-black/50 pl-2 pb-2 outline-none"
              placeholder="Enter Password"
            />
          </div>
        </div>

        <div className="cursor-pointer mt-8 md:mt-12 p-2 shadow-[2px_3px_8px_rgba(0,0,0,0.38)] text-center bg-white rounded-4xl font-semibold w-full md:w-[300px]">
          <Link to='/welcome'>
            <button className="text-base cursor-pointer">Let's Go</button>
          </Link>
        </div>

        <div className="flex gap-2 mt-4">
          <h4 className="font-medium">New here? Join us today by</h4>
          <Link to="/register">
            <span className="font-medium text-blue-700">Sign up</span>
          </Link>
        </div>

        <h3 className="font-semibold mt-4">- OR -</h3>

        {/* Google Login Button */}
        <div className="mt-2">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const post = await axiosInstance.post("/user/google-login", credentialResponse);
                  const user = post.data.data;
                  console.log("post user", user);
                  localStorage.setItem("loggedInUser", JSON.stringify(user));
                  localStorage.setItem("secretToken", JSON.stringify(user.token));
                  localStorage.setItem("role", "User");
                  navigate("/home");
                }}
                onError={() => console.log("Login Failed")}
                theme="outline"   
                text="continue_with"  
                shape="pill"          
                width="300px"
              />
        </div>

        <h4 className="font-medium pt-4 text-center">
          Your Smart Learning Journey Starts Here!
        </h4>
      </form>
    </motion.div>
  </div>
</div>

  );
};

export default Signup;
