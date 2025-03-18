import { Link, useParams } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { VscSettings } from "react-icons/vsc";

import { CiHeart } from "react-icons/ci";
import { useState } from "react";

export const courses = [
  {
    _id: "65a8b6f0c9e77a001d4b1234",
    title: "Algebra Basics",
    description:
      "Learn the fundamentals of algebra, including variables, equations, and expressions.",
    category: "maths",
    image: "welcome-bg.png",
    difficulty: "beginner",
    lessons: [
      {
        title: "Introduction to Variables",
        unlocked: true,
        completed: false,
        duration: 10,
      },
      {
        title: "Solving Simple Equations",
        unlocked: false,
        completed: false,
        duration: 12,
      },
      {
        title: "Understanding Expressions",
        unlocked: false,
        completed: false,
        duration: 8,
      },
      {
        title: "Basic Graphing",
        unlocked: false,
        completed: false,
        duration: 14,
      },
    ],
    whatyouwilllearn: [
      "Understand basic algebraic concepts",
      "Solve linear equations confidently",
      "Interpret and create simple graphs",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-03-14T10:00:00Z",
    updated_At: "2025-03-14T10:00:00Z",
  },
  {
    _id: "65a8b6f0c9e77a001d4b5678",
    title: "Exploring the Solar System",
    image: "welcome-bg.png",
    description:
      "Discover planets, stars, and galaxies in this introductory course on astronomy.",
    category: "science",
    difficulty: "intermediate",
    lessons: [
      {
        title: "The Sun and Its Role",
        unlocked: true,
        completed: false,
        duration: 9,
      },
      {
        title: "Planets and Their Moons",
        unlocked: false,
        completed: false,
        duration: 13,
      },
      {
        title: "Asteroids and Comets",
        unlocked: false,
        completed: false,
        duration: 10,
      },
      {
        title: "Basics of Telescopes",
        unlocked: false,
        completed: false,
        duration: 11,
      },
    ],
    whatyouwilllearn: [
      "Identify key components of our solar system",
      "Understand planetary movements",
      "Use telescopes for basic observation",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-03-10T14:30:00Z",
    updated_At: "2025-03-12T09:45:00Z",
  },
  {
    _id: "65a8b6f0c9e77a001d4b9101",
    title: "World War II: A Deep Dive",
    image: "welcome-bg.png",
    description:
      "Analyze key events, figures, and consequences of World War II.",
    category: "history",
    difficulty: "advanced",
    lessons: [
      {
        title: "Causes of World War II",
        unlocked: true,
        completed: false,
        duration: 12,
      },
      {
        title: "Major Battles and Strategies",
        unlocked: false,
        completed: false,
        duration: 15,
      },
      {
        title: "The Home Front: Civilians & Economy",
        unlocked: false,
        completed: false,
        duration: 10,
      },
      {
        title: "Post-War Reconstruction",
        unlocked: false,
        completed: false,
        duration: 13,
      },
    ],
    whatyouwilllearn: [
      "Understand geopolitical causes of WWII",
      "Analyze key battles and their outcomes",
      "Evaluate the impact of war on civilian life",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-02-20T08:15:00Z",
    updated_At: "2025-03-01T12:00:00Z",
  },
  {
    _id: "65a8b6f0c9e77a001d4b3456",
    title: "Creative Writing Essentials",
    image: "welcome-bg.png",
    description:
      "Enhance your storytelling skills with engaging writing techniques and exercises.",
    category: "english",
    difficulty: "beginner",
    lessons: [
      {
        title: "Building Strong Characters",
        unlocked: true,
        completed: false,
        duration: 8,
      },
      {
        title: "Writing Vivid Descriptions",
        unlocked: false,
        completed: false,
        duration: 10,
      },
      {
        title: "Creating Engaging Plots",
        unlocked: false,
        completed: false,
        duration: 12,
      },
      {
        title: "Editing and Polishing Stories",
        unlocked: false,
        completed: false,
        duration: 9,
      },
    ],
    whatyouwilllearn: [
      "Craft compelling characters",
      "Write immersive and vivid scenes",
      "Structure stories for maximum impact",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-01-15T16:45:00Z",
    updated_At: "2025-02-10T11:20:00Z",
  },
  {
    _id: "65a8b6f0c9e77a001d4b7890",
    title: "Introduction to Coding",
    image: "welcome-bg.png",
    description:
      "Start your coding journey with basic programming concepts using JavaScript.",
    category: "technology",
    difficulty: "beginner",
    lessons: [
      {
        title: "What is Programming?",
        unlocked: true,
        completed: false,
        duration: 9,
      },
      {
        title: "Variables and Data Types",
        unlocked: false,
        completed: false,
        duration: 11,
      },
      {
        title: "Conditional Statements",
        unlocked: false,
        completed: false,
        duration: 10,
      },
      {
        title: "Loops and Functions",
        unlocked: false,
        completed: false,
        duration: 14,
      },
    ],
    whatyouwilllearn: [
      "Understand core programming concepts",
      "Write simple JavaScript programs",
      "Debug and test basic code snippets",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-03-05T09:00:00Z",
    updated_At: "2025-03-10T10:00:00Z",
  },
];

const Courses = () => {
  const { category } = useParams();
  const [showsidebar, setShowsidebar] = useState(false)
  const course = courses.filter((item) => item.category === category);

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
                <Link to={`/course/${item.title}/${item._id}`}>
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
                    <Link to={`/course/${item.title}/${item._id}`} className="w-[80%]">
                      <button className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg ">
                        Start Learning
                      </button>
                    </Link>
                    <button className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 border border-gray-300 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-cyan-400/50">
                      <CiHeart />
                    </button>
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
