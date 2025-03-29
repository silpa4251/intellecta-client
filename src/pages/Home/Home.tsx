import WcNavbar from "../../components/Navbar/NavbarWelcome";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();

  const handleCourse = () => {
    navigate("/courses");
  };
  return (
    <div>
      <WcNavbar />
      <div className="flex justify-around mx-32 mt-16 gap-6 h-[500px]">
        <div className="flex flex-col w-1/3 gap-6">
          <h1 className="text-3xl font-bold mt-20">
            Join a Place Where Every Student Should Be
          </h1>
          <p className="text-lg font-semibold">
            Intellecta transforms traditional learning into exciting adventures.
            Our interactive courses combine fun and education, helping students
            develop critical thinking and technical skills while enjoying the
            learning process. With personalized paths and real-time feedback, we
            make education effective and engaging for every child.
          </p>
          <button
            onClick={handleCourse}
            className="bg-[#BFE5F8] w-fit px-4 py-3 cursor-pointer rounded-md font-semibold shadow-md"
          >
            View Courses
          </button>
        </div>

        <div className="w-1/3 bg-white border-4 border-[#BFE5F8] rounded-xl flex items-center">
          <img src="HomePage (1).jpg" className="w- z-10 " alt="" />
        </div>
         
        <div className="max-w-sm space-y-8">
          <div className="flex items-center gap-6 mt-20">
            <div className="bg-[#BFE5F8] rounded-full w-20 h-20 p-5 flex">
              <RiGraduationCapFill className="flex justify-center items-center text-[40px]"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Smart Lessons</h3>
              <p className="text-sm">
                Adaptive curriculum tailored to every learner.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-[#BFE5F8] rounded-full w-20 h-20 p-5 flex">
              {/* <img src={gameVector} className="flex justify-center items-center" alt="" /> */}
              <IoGameController className="flex justify-center items-center text-[40px]"/>

            </div>
            <div>
              <h3 className="text-xl font-semibold">Play & Learn</h3>
              <p className="text-sm">Learn, play, and earn rewards.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-[#BFE5F8] rounded-full w-20 h-20 p-5 flex">
              <FaRobot className="flex justify-center items-center text-[40px]"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI-Tutor</h3>
              <p className="text-sm">
                Get instant help and personalized support with our smart
                assistant.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
