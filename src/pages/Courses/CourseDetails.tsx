import { useParams } from "react-router-dom";
import { courses } from "./Courses";
import NavbarWelcome from "../../components/Navbar/NavbarWelcome";

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find((item) => item._id === id);

  return (
    <>
      <NavbarWelcome />
      <div className="mx-52 mt-10">
        <div>
          <div className="flex justify-between ">
            <div className="flex flex-col space-y-8 max-w-sm">
              <h1 className="text-4xl font-semibold">
                learn how to center a div
              </h1>
              <p>
                Learn web design in 1 hour with 25+ simple-to-use rules and
                guidelines — tons of amazing web design resources included!
              </p>
              <span>Created by : {course?.author.authorName}</span>
              <p>Reviews 4.5 ⭐⭐⭐⭐⭐</p>
            </div>
            <div>
              <img src="/welcome-bg.png" className="border border-gray-300 rounded-md w-[400px]" alt="" />
              <div className="flex justify-between gap-5 mt-5">
                <button
                  className="relative cursor-pointer w-full p-3 text-sm font-medium border border-gray-500 rounded-lg 
  overflow-hidden transition-all duration-300 text-gray-800 bg-white 
  before:absolute before:inset-0 before:bg-gray-800 before:w-full before:h-full before:scale-x-0 before:origin-left 
  before:transition-transform before:duration-500 hover:before:scale-x-100 hover:text-white 
  before:z-0 z-10"
                >
                  <span className="relative z-10">Start Learning</span>
                </button>
                <button className="rounded-md text-white font-semibold hover:bg-blue-700 cursor-pointer bg-blue-600 w-full p-3">
                  Attempt Quiz
                </button>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
