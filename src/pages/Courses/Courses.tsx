import { Link } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { VscSettings } from "react-icons/vsc";

import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import { courses } from "../../data";

const Courses = () => {
  const [showsidebar, setShowsidebar] = useState(false)

  const closeSideBarGlobally = ()=> {
    if(showsidebar){
      setShowsidebar(false)
    }
  }

  return (
    <>
      <WcNavbar />
      <div className="min-h-screen bg-[#ffffff]" onClick={closeSideBarGlobally}>
        <CourseSidebar showsidebar={showsidebar} onClose={()=> setShowsidebar(false)}/>
        <div className=" py-8 px-28">
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Courses</h2>
              <p className="text-gray-600">Showing 10 of 25 results</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 text-sm bg-white/50 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none transition-allcompleted: false,  duration-300"
              />
              <select className="px-3 py-2 text-sm bg-white/50 border border-gray-400 rounded-lg text-gray-700 focus:outline-none transition-allcompleted: false,  duration-300">
                <option value="">Recent</option>
                <option value="">Popular</option>
              </select>
              <div>
                <span className="text-xl cursor-pointer" onClick={()=> setShowsidebar(true)}><VscSettings/></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {courses.map((item) => (
              <div
                key={item._id}
                className="relative flex flex-col w-full max-w-xs bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-400/40"
              >
                
                <Link to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`}>
                  <img
                    src={"/welcome-bg.png"}
                    alt={item.title}
                    className="h-40 w-full object-cover border-b border-gray-200 transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={"/home-bg.png"}
                      alt={item.author?.authorName}
                      className="rounded-full h-8 w-8 border border-white/40 object-cover"
                    />
                    <span className="text-gray-800 text-sm">
                      By {item.author?.authorName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`} className="w-[100%]">
                      <button className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg ">
                        Start Learning
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
