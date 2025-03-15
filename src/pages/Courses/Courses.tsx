import { useParams } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { CiHeart } from "react-icons/ci";

const Courses = () => {
  const courses = [
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

  const { category } = useParams();
  const course = courses.filter((item) => item.category === category);
  console.log(course);

  return (
    <>
      <WcNavbar />
      <div className="mx-2">
        <CourseSidebar />
        <div className="ml-64 pt-8 mx-28">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">Courses</h2>
              <p>showing 10 of 25 results</p>
            </div>
            <div>
              <input type="text" placeholder="search" className="border p-1" />
              <button>sort by</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-5">
            {courses.map((item) => (
              <div
                key={item._id}
                className="w-[320px] bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 "
              >
                <img
                  src={"/welcome-bg.png"}
                  className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                  alt={item.title}
                />

                <div className="p-4">
                
                  <h2 className="text-lg font-semibold text-gray-900 mt-2">
                    {item.title}
                  </h2>

                    <span className="text-gray-700 text-sm">
                      {item.description}
                    </span>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={"/home-bg.png"}
                      alt={item.author?.authorName}
                      className="rounded-full h-7 w-7 border border-gray-300"
                    />
                    <span className="text-gray-700 text-sm">
                      {item.author?.authorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-lg">
                      4.0 ⭐⭐⭐⭐☆
                    </span>
                    <span className="text-gray-600 text-sm font-semibold">
                      (3)
                    </span>
                  </div>
                  <div className="flex justify-between">

                  <button className="w-[83%] mt-4 py-2 text-sm font-medium text-blue-600 border border-gray-500 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:text-white">
                    Start Learning
                  </button>
                  <button className="w-10 h-10 rounded-full mt-4 py-2 text-sm font-medium text-white border border-gray-500 transition-all duration-300 hover:bg-gray-500 hover:text-white">
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
