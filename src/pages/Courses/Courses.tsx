import { Link, useParams } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpinningLoader from "../../components/Loaders/SpinningLoader";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  gradeLevel?: number;
  difficultyLevel?: string;
}

interface Progress {
  progressPercent: number;
}

interface ProgressMap {
  [courseId: string]: Progress;
}

// Course progress API call
const fetchCourseProgress = async (courseId: string) => {
  try {
    const response = await axios.get(`http://localhost:5005/api/progress/${courseId}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    console.warn(`Progress not found for course ${courseId}`);
    throw err;
  }
};

const Courses = () => {
  const [showsidebar, setShowsidebar] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // State for filtered courses
  const { category } = useParams<{ category: string }>();
  console.log("Category:", category);

  const closeSideBarGlobally = () => {
    if (showsidebar) {
      setShowsidebar(false);
    }
  };

  const fetchCourses = async () => {
    const response = await axios.get(`http://localhost:5005/api/courses/subject/${category}`, {
      withCredentials: true,
    });
    console.log("Fetched courses:", response.data.data);
    return response.data.data;
  };

  const { data: initialCourses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["courses", category],
    queryFn: fetchCourses,
    enabled: !!category,
  });

  // Query for fetching course progress for each course
  const { data: progressData, isLoading: isProgressLoading } = useQuery<ProgressMap>({
    queryKey: ["courseProgress", initialCourses.map((course) => course._id)],
    queryFn: async () => {
      const progressResults = await Promise.allSettled(
        initialCourses.map((course) => fetchCourseProgress(course._id))
      );
      return initialCourses.reduce<ProgressMap>((acc, course, index) => {
        const result = progressResults[index];
        if (result.status === "fulfilled") {
          acc[course._id] = result.value;
        }
        return acc;
      }, {});
    },
    enabled: initialCourses.length > 0,
    initialData: {} as ProgressMap,
  });
  // Callback to update courses when filters are applied
  const handleCoursesUpdate = (courses: Course[]) => {
    console.log("Filtered courses received:", courses);
    setFilteredCourses(courses);
  };

  // Use filteredCourses if available, otherwise fall back to initialCourses
  const displayedCourses = filteredCourses.length > 0 ? filteredCourses : initialCourses;
  if (isLoading || isProgressLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
        <p className="mt-14 text-xl font-semibold text-gray-800">Loading your Courses. Please wait...!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading courses: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <WcNavbar />
      <div className="min-h-screen bg-[#ffffff]" onClick={closeSideBarGlobally}>
        <CourseSidebar
          showsidebar={showsidebar}
          onClose={() => setShowsidebar(false)}
          subject={category || ""} // Pass category as subject
          onCoursesUpdate={handleCoursesUpdate}
        />
        <div className="py-8 px-28">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Courses</h2>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 text-sm bg-white/50 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none transition-all duration-300"
              />
              <select className="px-3 py-2 text-sm bg-white/50 border border-gray-400 rounded-lg text-gray-700 focus:outline-none transition-all duration-300">
                <option value="">Recent</option>
                <option value="">Popular</option>
              </select>
              <div>
                <span className="text-xl cursor-pointer" onClick={() => setShowsidebar(true)}>
                  <VscSettings />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {displayedCourses.map((item: Course) => {
              const progress = progressData[item._id];
              const progressPercentage = progress ? progress.progressPercent : 0;
              return (
                <div
                  key={item._id}
                  className="relative flex flex-col w-full max-w-xs bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-400/40"
                >
                  <Link to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`}>
                    <img
                      src={item.thumbnail || "/welcome-bg.png"}
                      alt={item.title}
                      className="h-48 w-full object-cover border-b border-gray-200 transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="p-4 space-y-2">
                    <h2 className="text-base text-center font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-gray-700 text-sm line-clamp-2 w-full">{item.description}</p>
                    <p className="text-gray-700 text-sm font-semibold text-center">
                      Grade: {item.gradeLevel || "Basic"}
                    </p>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Progress: {Math.round(progressPercentage)}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-violet-600 h-2.5 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Link to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`} className="w-[100%]">
                        <button className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg">
                          Start Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;