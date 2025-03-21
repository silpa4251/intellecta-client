import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { lessons } from "../../../data";
import { useLessonStore } from "../../../store/useLessonStore";
import { Lesson } from "../../../types";

type Params = {
  lessonTitle: string,
  id?:string
}

const LessonQuiz = () => {

  const { lessonTitle="", id="" } = useParams<Params>();
  const { lessonData, updateLesson } = useLessonStore();

  const realLesson = lessonData[id] || [];

  const decodedLessonTitle = lessonTitle.replace(/-/g, " ");
  const currentLessonIndex = lessons.findIndex((lesson) => lesson.title === decodedLessonTitle);
  const currentLesson = lessons[currentLessonIndex];

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stepResults, setStepResults] = useState(Array(currentLesson.quiz.length).fill(null));
  const steps = currentLesson.quiz.length;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion = currentLesson.quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newStepResults = [...stepResults];
    newStepResults[currentStep] = isCorrect;
    setStepResults(newStepResults);

    setSelectedOption(null);

    if (currentStep < steps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLessonComplete = () => {
    const currentIndex = realLesson.findIndex(
      (lesson: Lesson) => lesson.title === decodedLessonTitle
    );

    if (currentIndex === -1) return;

    const lessonId = realLesson[currentIndex].id;

    updateLesson(id, lessonId, { completed: true });

    if (currentIndex + 1 < realLesson.length) {
      const nextLessonId = realLesson[currentIndex + 1].id;
      updateLesson(id, nextLessonId, { unlocked: true });
    }
  };

  const handleSubmitScore = () => {
    const currentQuestion = currentLesson.quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.answer;
    const finalScore = ((score + (isCorrect ? 1 : 0)) / steps) * 100;
    console.log(finalScore);

    const newStepResults = [...stepResults];
    newStepResults[currentStep] = isCorrect;
    setStepResults(newStepResults);

    handleLessonComplete();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 bg-gray-50 relative overflow-hidden">
      <div className="flex items-center justify-between mx-auto w-fit space-x-4 relative mb-10 z-10">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-[90%] h-1 bg-gray-300 z-0 rounded"></div>
        {[...Array(steps)].map((_, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition duration-300 ${
              stepResults[index] === null
                ? "bg-white border-gray-400"
                : stepResults[index]
                ? "bg-green-500 border-green-500 shadow-lg"
                : "bg-red-500 border-red-500 shadow-lg"
            }`}
          >
            {stepResults[index] !== null ? (
              stepResults[index] ? (
                <IoCheckmarkOutline className="text-white text-xl" />
              ) : (
                <IoClose className="text-white text-xl" />
              )
            ) : (
              <span className="text-gray-500 font-bold">{index + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-lg font-semibold">
          Score: {score}/{steps}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center text-center mb-16 z-10">
        <h1 className="text-xl font-semibold mb-6">
          {currentLesson.quiz[currentStep].question}
        </h1>
        <div className="flex flex-col space-y-4">
          {currentLesson.quiz[currentStep].options.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(ans)}
              className={`px-6 py-3 border rounded-lg shadow transition duration-200 ${
                selectedOption === ans
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {ans}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end z-10 space-x-4">
        {currentStep < steps - 1 && (
          <button
            onClick={handleNext}
            disabled={selectedOption === null} // Disable if no option selected
            className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ${
              selectedOption === null
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next
          </button>
        )}
        {currentStep === steps - 1 && (
          <button
            onClick={handleSubmitScore}
            disabled={selectedOption === null} 
            className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ${
              selectedOption === null
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonQuiz;
