import { Link, useParams } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { CiHeart } from "react-icons/ci";

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
      "Introduction to Variables",
      "Solving Simple Equations",
      "Understanding Expressions",
      "Basic Graphing",
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
      "The Sun and Its Role",
      "Planets and Their Moons",
      "Asteroids and Comets",
      "Basics of Telescopes",
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
      "Causes of World War II",
      "Major Battles and Strategies",
      "The Home Front: Civilians & Economy",
      "Post-War Reconstruction",
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
      "Building Strong Characters",
      "Writing Vivid Descriptions",
      "Creating Engaging Plots",
      "Editing and Polishing Stories",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-01-15T16:45:00Z",
    updated_At: "2025-02-10T11:20:00Z",
  },
  {
    _id: "65a8b6f0c9e77a001d4b1234",
    title: "Algebra Basics",
    description:
      "Learn the fundamentals of algebra, including variables, equations, and expressions.",
    category: "maths",
    image: "welcome-bg.png",
    difficulty: "beginner",
    lessons: [
      "Introduction to Variables",
      "Solving Simple Equations",
      "Understanding Expressions",
      "Basic Graphing",
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
      "The Sun and Its Role",
      "Planets and Their Moons",
      "Asteroids and Comets",
      "Basics of Telescopes",
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
      "Causes of World War II",
      "Major Battles and Strategies",
      "The Home Front: Civilians & Economy",
      "Post-War Reconstruction",
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
      "Building Strong Characters",
      "Writing Vivid Descriptions",
      "Creating Engaging Plots",
      "Editing and Polishing Stories",
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png",
    },
    created_At: "2025-01-15T16:45:00Z",
    updated_At: "2025-02-10T11:20:00Z",
  },
];

const Courses = () => {
  

  const { category } = useParams();
  const course = courses.filter((item) => item.category === category);
  console.log(course);

  return (
    <>
      <WcNavbar />
      {/* gradient change soon */}
      <div className="min-h-screen bg-gradient-to-r from-[#0A5EB0] to-blue-900">
        <CourseSidebar />
        <div className="ml-64 py-8 px-16">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Courses</h2>
              <p className="text-gray-300">Showing 10 of 25 results</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-cyan-400/50 transition-all duration-300">
                Sort By
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-10 mt-8">
            {courses.map((item) => (
              <div
                key={item._id}
                className="relative flex flex-col gap-0 w-[280px] bg-white/10 backdrop-blur-lg shadow-md rounded-xl overflow-hidden border border-white/20 
            hover:shadow-blue-500/50 transition-all duration-300"
              >
              <Link to={`/courses/${item.category}/${item._id}`}>
              <img
                  src={"/welcome-bg.png"}
                  className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                  alt={item.title}
                />
              </Link>

                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                  <span className="text-gray-300 text-sm line-clamp-2">
                    {item.description}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={"/home-bg.png"}
                      alt={item.author?.authorName}
                      className="rounded-full h-7 w-7 border border-white/30"
                    />
                    <span className="text-gray-300 text-sm">
                      By {item.author?.authorName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <button
                      className="cursor-pointer relative w-[80%] mt-4 py-2 text-sm font-medium border border-cyan-400 rounded-lg text-white 
                  overflow-hidden transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg
                  before:absolute before:inset-0 before:bg-white/10 before:w-full before:h-full before:scale-x-0 before:origin-left 
                  before:transition-transform before:duration-500 hover:before:scale-x-100 
                  hover:shadow-blue-500/50 before:z-0 z-10"
                    >
                      <span className="relative z-10">Start Learning</span>
                    </button>

                    <button
                      className="w-10 h-10 flex items-center justify-center text-xl rounded-full mt-4 border border-white/30 text-white 
                  hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-cyan-400/50"
                    >
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
