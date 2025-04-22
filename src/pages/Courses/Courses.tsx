import { Link, useParams } from "react-router-dom";
import WcNavbar from "../../components/Navbar/NavbarWelcome";
import CourseSidebar from "./CourseSidebar";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpinningLoader from "../../components/Loaders/SpinningLoader";
<<<<<<< HEAD
import { toast } from "react-toastify";

// Course progress API call
const fetchCourseProgress = async (courseId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5005/api/progress/${courseId}`,
      { withCredentials: true }
    );
    console.log("response for the courses", response.data);
    return response.data.data;
  } catch (err) {
    console.warn(`Progress not found for course ${courseId}`);
    throw err;
  }
};
=======
// import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  gradeLevel?: number;
  difficultyLevel?: string;
}

<<<<<<< HEAD
interface progress {
=======
interface Progress {
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
  progressPercent: number;
}

interface ProgressMap {
  [courseId: string]: Progress;
}

// Course progress API call
const fetchCourseProgress = async (courseId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5005/api/progress/${courseId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (err) {
    console.warn(`Progress not found for course ${courseId}`);
    throw err;
  }
};

const Courses = () => {
  const [showsidebar, setShowsidebar] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const { category } = useParams<{ category: string }>();

  const closeSideBarGlobally = () => {
    if (showsidebar) {
      setShowsidebar(false);
    }
  };

  const fetchCourses = async () => {
<<<<<<< HEAD
    if (!category) {
      return toast("category not found");
    }
=======
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
    const response = await axios.get(
      `http://localhost:5005/api/courses/subject/${category}`,
      { withCredentials: true }
    );
<<<<<<< HEAD
    console.log("fetch courses", response.data.data);
    return response.data.data;
  };

  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses", category],
    queryFn: fetchCourses,
    enabled: !!category,
  });

  // Query for fetching course progress for each course
  const { data: progressData, isLoading: isProgressLoading } =
    useQuery<ProgressMap>({
      queryKey: ["courseProgress", courses.map((course) => course._id)],
      queryFn: async () => {
        const progressResults = await Promise.allSettled(
          courses.map((course) => fetchCourseProgress(course._id))
        );
        return courses.reduce<ProgressMap>((acc, course, index) => {
=======
    return response.data.data || [];
  };

  const { data: initialCourses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["courses", category],
    queryFn: fetchCourses,
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });

  const { data: progressData, isLoading: isProgressLoading } =
    useQuery<ProgressMap>({
      queryKey: ["courseProgress", initialCourses.map((course) => course._id)],
      queryFn: async () => {
        const progressResults = await Promise.allSettled(
          initialCourses.map((course) => fetchCourseProgress(course._id))
        );
        return initialCourses.reduce<ProgressMap>((acc, course, index) => {
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
          const result = progressResults[index];
          if (result.status === "fulfilled") {
            acc[course._id] = result.value;
          }
<<<<<<< HEAD
          // else {
          //   // Optionally log or handle the error
          //   console.warn(`Failed to fetch progress for course ${course._id}:`, result.reason);
          // }
          return acc;
        }, {});
      },
      enabled: courses.length > 0,
      initialData: {} as ProgressMap,
    });
  console.log("first", progressData);
=======
          return acc;
        }, {});
      },
      enabled: initialCourses.length > 0,
      initialData: {} as ProgressMap,
    });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredCourses([]); // Reset to show all courses when query is empty
    } else {
      const filtered = initialCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) || course.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const handleCoursesUpdate = (courses: Course[]) => {
    setFilteredCourses(courses);
  };

  const displayedCourses =
    filteredCourses.length > 0 ? filteredCourses : initialCourses;

>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
  if (isLoading || isProgressLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
<<<<<<< HEAD
        <p className="mt-14 text-xl font-semibold text-gray-800">
=======
        <p className="mt-12 text-sm sm:text-base md:text-lg font-semibold text-gray-800 text-center px-4">
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
          Loading your Courses. Please wait...!
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center text-sm sm:text-base md:text-lg text-red-600">
          Error loading courses: {error.message}
        </p>
      </div>
    );
  }
  

  return (
    <>
      <WcNavbar />
<<<<<<< HEAD
      <div className="min-h-screen bg-[#ffffff]" onClick={closeSideBarGlobally}>
        <CourseSidebar
          showsidebar={showsidebar}
          onClose={() => setShowsidebar(false)}
        />
        <div className="py-8 px-28">
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">Courses</h2>
            </div>
            <div className="flex items-center space-x-4">
=======
      <div
        className="min-h-screen bg-white"
        onClick={closeSideBarGlobally}
      >
        <CourseSidebar
          showsidebar={showsidebar}
          onClose={() => setShowsidebar(false)}
          subject={category || ""}
          onCoursesUpdate={handleCoursesUpdate}
        />
        <div className="py-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-800">
              Courses
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
              <input
                type="text"
                placeholder="Search courses"
                className="px-3 py-2 text-sm sm:text-base bg-white border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 w-full"
                aria-label="Search courses"
                value={searchQuery} // Bind input to searchQuery state
                onChange={handleSearchChange} // Add onChange handler
              />
              <select
                className="px-3 py-2 text-sm sm:text-base bg-white border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 w-full"
                aria-label="Sort courses"
              >
                <option value="">Recent</option>
                <option value="">Popular</option>
              </select>
<<<<<<< HEAD
              <div>
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => setShowsidebar(true)}
                >
                  <VscSettings />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {courses.map((item: Course) => {
              const progress = progressData[item._id]; // Get progress for each course
              const progressPercentage = progress
                ? progress.progressPercent
                : 0;
=======
              <button
                className="p-2 text-xl text-gray-700 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
                onClick={() => setShowsidebar(true)}
                aria-label="Open filters"
              >
                <VscSettings />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 sm:mt-8">
            {displayedCourses.map((item: Course) => {
              const progress = progressData[item._id];
              const progressPercentage = progress ? progress.progressPercent : 0;
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
              return (
                <div
                  key={item._id}
                  className="flex flex-col w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-violet-400/40"
                >
<<<<<<< HEAD
                  <Link
                    to={`/course/${item.title.replace(/\s+/g, "-")}/${
                      item._id
                    }`}
                  >
                    <img
                      src={item.thumbnail || "/welcome-bg.png"}
                      alt={item.title}
                      className="h-48 w-full object-cover border-b border-gray-200 transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="p-4 space-y-2">
                    <h2 className="text-base text-center font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 text-sm line-clamp-2 w-full">
                      {item.description}
                    </p>
                    <p className="text-gray-700 text-sm font-semibold text-center">
                      Grade: {item.gradeLevel || "Basic"}
                    </p>

                    <div className="mt-4">
                      {/* Display course progress */}
                      <p className="text-sm text-gray-600">
                        Progress: {Math.round(progressPercentage)}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
=======
                  <Link to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`}>
                    <div className="relative w-full h-44">
                      <img
                        src={item.thumbnail || "/welcome-bg.png"}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover border-b border-gray-200 transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-4 space-y-2">
                    <h2 className="text-sm sm:text-base font-semibold text-center line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 text-xs sm:text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-gray-700 text-xs sm:text-sm font-semibold text-center">
                      Grade: {item.gradeLevel || "Basic"}
                    </p>

                    <div className="mt-3">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Progress: {Math.round(progressPercentage)}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
                        <div
                          className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

<<<<<<< HEAD
                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/course/${item.title.replace(/\s+/g, "-")}/${
                          item._id
                        }`}
                        className="w-[100%]"
                      >
                        <button className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg ">
                          Start Learning
                        </button>
                      </Link>
                    </div>
=======
                    <Link
                      to={`/course/${item.title.replace(/\s+/g, "-")}/${item._id}`}
                      className="mt-4 block"
                    >
                      <button className="w-full px-4 py-2 text-sm sm:text-base font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300">
                        Start Learning
                      </button>
                    </Link>
>>>>>>> 0d2df07d5a0951218feca959164f7ef93c7d92f5
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