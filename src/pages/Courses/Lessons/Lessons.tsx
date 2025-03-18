import { AiOutlineMenuFold } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { courses } from "../Courses";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import { MdLockOutline } from "react-icons/md";
import CircularProgress from "../../../utils/ui/Progress";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const Lessons = () => {
  const { id } = useParams();
  const course = courses.find((item) => item._id === id);
  const [selectLesson, setSelectLesson] = useState(0);
  const [progress, setProgress] = useState(0);

  const completedCount = course?.lessons.filter(lesson => lesson.completed).length || 0;

  const calculateProgress = (lessons) => {
    const totalLesson = lessons.length;
    const completedLesson = lessons.filter((lesson) => lesson.completed).length;
    const progress = (completedLesson / totalLesson) * 100;
    return Math.round(progress);
  };



  const chooseLesson = (lesson) => {
    const currentIndex = course.lessons.findIndex(
      (l) => l.title === lesson.title
    );

    if (currentIndex === 0 || course.lessons[currentIndex - 1].completed) {
      if (!lesson.completed) {
        setSelectLesson(lesson);
      }
    } else {
      console.warn("You need to complete previous lessons first.");
    }
  };

  const handleLesson = () => {
    if (!course || selectLesson === null) return;

    const currentIndex = course.lessons.findIndex(
      (lesson) => lesson.title === selectLesson.title
    );

    if (!course.lessons[currentIndex].unlocked) {
      course.lessons[currentIndex].unlocked = true;
    }

    course.lessons[currentIndex].completed = true;

    if (currentIndex + 1 < course.lessons.length) {
      course.lessons[currentIndex + 1].unlocked = true;
      setSelectLesson(course.lessons[currentIndex + 1]);
    } else {
      setSelectLesson(null);
    }

    const progressPercentage = calculateProgress(course.lessons);
    setProgress(progressPercentage);
  };

  useEffect(()=>{
    if(course && course.lessons.length > 0){
      const firstlesson = course.lessons[0]
      if(firstlesson.unlocked && !firstlesson.completed){
        setSelectLesson(firstlesson)
      }
    }
  },[course])

  return (
    <>
      <NavbarWelcome />
      <div className="pb-5">
        <div className="flex justify-between py-4 px-8 border-b border-b-gray-300">
          <div className="flex items-center gap-5">
            <span className="text-2xl">
              <AiOutlineMenuFold />
            </span>
            <h3>{course?.title}</h3>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-medium">{completedCount}/{course?.lessons.length}</span>
            <div className="bg-gray-300 w-44 h-2 rounded-r-lg rounded-l-lg">
              <div className={`bg-green-600 h-2 rounded-l-lg rounded-r-lg`} style={{width: `${progress}%`}}></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-32 gap-10 mt-10">
          <div className="w-1/3 space-y-5">
            <div className="space-y-2">
              <h3 className="pb-2 border-b border-b-gray-300">SECTION</h3>
              <div className="flex justify-between mt-5">
                <div className="max-w-xs">
                  <h2 className="font-semibold text-2xl">{course?.title}</h2>
                  <p>{course?.description}</p>
                </div>

                <CircularProgress percentage={progress} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="pb-2 border-b border-b-gray-300">CONTENT</h3>
              <div className="border w-fit rounded-lg mt-5">
                <h5 className="p-2">Youtube Reference</h5>
                <iframe
                  width="420"
                  className="rounded-b-lg"
                  height="315"
                  src="https://www.youtube.com/embed/Gjnup-PuquQ?si=wP0zy2BsIPz4k1se"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <h3 className="pb-2 border-b border-b-gray-300">LESSONS</h3>
            <div className="mt-5">
              {course?.lessons.map((lesson, index) => (
                <div
                  onClick={() => chooseLesson(lesson)}
                  className={`flex items-center justify-between rounded-md gap-2 mb-4 px-4 py-4 ${lesson.unlocked && "cursor-pointer"} shadow-md border ${
                    selectLesson === lesson
                      ? "border-2 border-green-500"
                      : "border-2 border-gray-300"
                  } `}
                >
                  <div className="flex gap-2 ">
                    <span>0{index + 1}</span>
                    <h3>{lesson.title}</h3>
                  </div>
                  {lesson.completed && (
                    <span className="text-green-500 text-2xl">
                      <IoCheckmarkCircleOutline />
                    </span>
                  )}
                  {lesson.unlocked && !lesson.completed && <span>Learn</span>}

                  {!lesson.unlocked && (
                    <span className="text-lg">
                      <MdLockOutline />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="border-b w-full border-b-gray-300 pb-5"></div>
            <div className="flex justify-end mt-5">
              <button 
              onClick={handleLesson}
              className="cursor-pointer relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-whitke transition duration-300 ease-out border border-green-500 rounded-lg shadow-md group hover:shadow-lg">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-20 group-hover:opacity-40 blur-sm"></span>
                <span className="absolute inset-0 w-full h-full border border-green-500 rounded-lg group-hover:animate-pulse"></span>
                <span className="relative z-10" >
                  {progress >= 100 ? "Completed" : "Continue"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lessons;
