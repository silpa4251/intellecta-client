import { AiOutlineMenuFold } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import { MdLockOutline } from "react-icons/md";
import CircularProgress from "../../../utils/ui/Progress";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { courses } from "../../../data";
import { useLessonStore } from "../../../store/useLessonStore";
import { Lesson } from "../../../types";

type Params = {
  id: string;
};

const Lessons = () => {
  const { id = "" } = useParams<Params>();
  const navigate = useNavigate();
  const course = courses.find((item) => item._id === id);
  const { lessonData, initializeLessons, getProgress } = useLessonStore();

  const realLesson = lessonData[id] || [];
  const progress = getProgress(id);

  const [selectLesson, setSelectLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (course && !lessonData[id]) {
      initializeLessons(id);
    }
  }, [course, id, initializeLessons, lessonData]);

  const completedCount = realLesson.filter(
    (lesson: Lesson) => lesson.completed
  ).length;

  const chooseLesson = (lesson: Lesson) => {
    const currentIndex = realLesson.findIndex((l) => l.id === lesson.id);
    if (currentIndex === 0 || realLesson[currentIndex - 1].completed) {
      if (!lesson.completed) {
        setSelectLesson(lesson);
      }
    } else {
      console.warn("You need to complete previous lessons first.");
    }
  };

  const handleLesson = () => {
    if (!selectLesson) {
      const firstUncompleted = realLesson.find(
        (lesson) => lesson.unlocked && !lesson.completed
      );
      if (firstUncompleted) {
        navigate(
          `/lesson/${firstUncompleted.title.replace(/\s+/g, "-")}/${
            firstUncompleted.id
          }`
        );
      }
      return;
    }

    navigate(
      `/lesson/${selectLesson.title.replace(/\s+/g, "-")}/${selectLesson.id}`
    );
  };

  useEffect(() => {
    if (realLesson.length > 0 && !selectLesson) {
      const firstUncompleted = realLesson.find(
        (lesson) => lesson.unlocked && !lesson.completed
      );
      if (firstUncompleted) {
        setSelectLesson(firstUncompleted);
      }
    }
  }, [realLesson, selectLesson]);

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
            <h3 className="pb-2 border-b border-b-gray-300">Lessons</h3>
            <div className="mt-5">
              {realLesson.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => chooseLesson(lesson)}
                  className={`flex items-center justify-between rounded-md gap-2 mb-4 px-4 py-4 ${
                    lesson.unlocked ? "cursor-pointer" : "cursor-not-allowed"
                  } shadow-md border ${
                    selectLesson?.id === lesson.id
                      ? "border-2 border-green-500"
                      : "border-2 border-gray-300"
                  }`}
                >
                  <div className="flex gap-2">
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
                className={`cursor-pointer  px-6 py-2  font-semibold text-white transition duration-300 ease-out border ${selectLesson ? "bg-green-400" : "bg-gray-400"} border-green-500 rounded-lg shadow-md group hover:shadow-lg`}
                disabled={progress >= 100}
              >
                {progress >= 100 ? "Completed" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lessons;
