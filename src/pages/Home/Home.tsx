import WcNavbar from "../../components/Navbar/NavbarWelcome";
import gradcap from "../../assets/grad-cap.svg";
import gameVector from "../../assets/game.svg";
import botVector from "../../assets/bot.svg";
import { useRef } from "react";
import Programs from "./Programs";

const Home = () => {
  const programRef = useRef<HTMLDivElement>(null);

  const handleCourse = () => {
    programRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <WcNavbar />
      <div className="flex justify-around mx-28 mt-10">
        <div className="flex flex-col w-1/3 gap-8">
          <h1 className="text-3xl font-semibold">
            Join a Place Where Every Student Should Be
          </h1>
          <p className="text-lg font-medium">
            Intellecta transforms traditional learning into exciting adventures.
            Our interactive courses combine fun and education, helping students
            develop critical thinking and technical skills while enjoying the
            learning process. With personalized paths and real-time feedback, we
            make education effective and engaging for every child.
          </p>
          <button
            onClick={handleCourse}
            className="bg-[#F7D232] w-fit px-4 py-3 cursor-pointer rounded-md font-semibold shadow-md"
          >
            View Courses
          </button>
        </div>
        <div className="w-1/3">
          <img src="home-bg.png" className="w-[450px] z-10" alt="" />
          <div className="w-[650px] h-[90px] -z-10 bg-[#F7D232] rounded-xl relative bottom-14 left-28 shadow-xl"></div>
        </div>
        <div className=" max-w-sm space-y-8 mt-14">
          <div className="flex  items-center gap-5">
            <div className="bg-[#F7D232] rounded-full p-5">
              <img src={gradcap} className="w-12 h-12" alt="" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Smart Lessons</h3>
              <p className="max-w-52">
                Adaptive curriculum tailored to every learner.
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-5">
            <div className="bg-[#F7D232] rounded-full p-5">
              <img src={gameVector} className="w-12 h-12" alt="" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Play & Learn</h3>
              <p>Learn, play, and earn rewards.</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-[#F7D232] rounded-full p-5">
              <img src={botVector} className="w-20 h-12" alt="" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI-Tutor</h3>
              <p>
                Get instant help and personalized support with our smart
                assistant.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Programs programRef={programRef} />
    </div>
  );
};

export default Home;
