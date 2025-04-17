import { AiOutlineMenuFold } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
// import { MdLockOutline } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import CircularProgress from "../../../utils/ui/Progress";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Lesson } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import SpinningLoader from "../../../components/Loaders/SpinningLoader";
import axiosInstance from "../../../utils/axiosInstance";

type Params = {
  id: string;
  courseTitle: string;
};

const Lessons = () => {
  const { id = "", courseTitle = "" } = useParams<Params>();
  const navigate = useNavigate();

  const fetchCourseWithLessons = async () => {
    const response = await axiosInstance.get(`courses/${id}`);
    console.log("Fetching lessons", response);
    return response.data.data;
  };

  const { 
    data, 
    isLoading, 
    error 
  } = useQuery<{
    course: { _id: string; title: string; description: string };
    lessons: Lesson[];
  }>({
    queryKey: ['courseWithLessons', id],
    queryFn: fetchCourseWithLessons,
    enabled: !!id,
  });

  const [selectLesson, setSelectLesson] = useState<Lesson | null>(null);
  const realLesson = data?.lessons || [];
  
  const completedCount = realLesson.filter(lesson => lesson.completed).length;
  const progress = realLesson.length > 0 
    ? Math.round((completedCount / realLesson.length) * 100) 
    : 0;

  const chooseLesson = (lesson: Lesson) => {
    // Allow clicking on any lesson regardless of completion status or position
    setSelectLesson(lesson);
    const sanitizedTitle = lesson.title.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-");
    navigate(`/lesson/${sanitizedTitle}/${lesson._id}`, {
      state: { courseTitle, courseId: id },
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
        <SpinningLoader />
        <p className="mt-14 text-xl font-semibold text-gray-800">
          Loading your Courses. Please wait...!
        </p>
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

  if (!data) {
    return null;
  }

  return (
    <>
      <NavbarWelcome />
      <div className="pb-5">
        <div className="flex justify-between py-4 px-8 border-b border-b-gray-300">
          <div className="flex items-center gap-5">
            <span className="text-2xl">
              <AiOutlineMenuFold 
              onClick={() => navigate(-1)}
              />
            </span>
            <h3 className="font-semibold">{data.course.title}</h3>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-medium">
              {completedCount}/{realLesson.length}
            </span>
            <div className="bg-gray-300 w-44 h-2 rounded-r-lg rounded-l-lg">
              <div
                className="bg-green-600 h-2 rounded-l-lg rounded-r-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-32 gap-10 mt-10">
        <div className="w-1/3 space-y-5">
          <div className="space-y-2">
            <h3 className="pb-2 border-b border-b-gray-300 font-bold">COURSE</h3>
            <div className="flex justify-between mt-4">
              <div className="max-w-xs mt-4">
                <h3 className="font-semibold text-2xl">{data.course.title}</h3>
                <p>{data.course.description}</p>
              </div>
              <div className="mt-6">
                <CircularProgress  percentage={progress}/></div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="pb-2 border-b border-b-gray-300 font-bold">CONTENT</h3>
          </div>
          <div className="w-full mt-10">
          <video
            className="h-auto w-full "
            // controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/366278579992174595.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
          </div>
        </div>

          <div className="w-2/3">
            <h3 className="pb-2 border-b border-b-gray-300 font-bold">LESSONS</h3>
            <div className="mt-5">
              {realLesson.map((lesson, index) => (
                <div
                  key={lesson._id}
                  onClick={() => chooseLesson(lesson)}
                  className={`flex items-center justify-between font-semibold rounded-md gap-2 mb-4 px-4 py-4 shadow-md border cursor-pointer ${
                    selectLesson?._id === lesson._id 
                      ? "border-2 border-green-500" 
                      : "border-2 border-gray-300"
                  }`}
                >
                  <div className="flex gap-2">
                    <span>{index + 1}.</span>
                    <h3>{lesson.title}</h3>
                  </div>
                  {lesson.completed ? (
                    <span className="text-green-500 text-2xl">
                      <IoCheckmarkCircleOutline />
                    </span>
                  ) : (
                    <span><FaPlay /></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lessons;