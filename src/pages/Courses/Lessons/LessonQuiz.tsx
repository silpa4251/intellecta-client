import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NavbarWelcome from "../../../components/Navbar/NavbarWelcome";
import QuizCompleted from "../../../utils/ui/QuizCompleted";
import SpinningLoader from "../../../components/Loaders/SpinningLoader";

type Params = {
  courseId?: string;
};

interface currentQsType {
  correctAnswer: string;
}

interface QuizDataType {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  difficulty: string;
}

const LessonQuiz = () => {
  const { courseId } = useParams<Params>();
  const queryClient = useQueryClient();
  const [showCompleted, setShowCompleted] = useState(false);
  const [quiz, setQuiz] = useState<QuizDataType[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stepResults, setStepResults] = useState(
    Array(quiz?.length).fill(null)
  );
  const steps = quiz?.length || 0;

  const { mutate: postLessonQuiz, isPending } = useMutation({
    mutationKey: ["fetchlessonquiz"],
    mutationFn: async (courseId: string) => {
      const res = await axios.post(
        `http://localhost:5005/api/courses/generate-quiz`,
        courseId
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizLesson"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: quizData, isLoading } = useQuery({
    queryKey: ["quizLesson", courseId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5005/api/courses/fetch-quiz/${courseId}`
      );
      return res.data.quiz || [];
    },
    enabled: !!courseId,
  });

  useEffect(() => {
    if (quizData) {
      const shuffled = [...quizData].sort(() => Math.random() - 0.5);
      setQuiz(shuffled);
    }
  }, [quizData]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion: currentQsType = quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

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

  const handleSubmitScore = () => {
    setShowCompleted(true);
    const currentQuestion: currentQsType = quiz[currentStep];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const finalScore = ((score + (isCorrect ? 1 : 0)) / steps) * 100;
    const newStepResults = [...stepResults];
    newStepResults[currentStep] = isCorrect;
    setStepResults(newStepResults);
  };

  return (
    <>
      <NavbarWelcome />
      {isPending ? (
        <button className="bg-blue-600 animate-pulse">
          Generating Questions
        </button>
      ) : (
        quiz.length === 0 && (
          <button
            onClick={() => postLessonQuiz(courseId || "")}
            className="cursor-pointer bg-orange-500 p-5 text-3xl"
          >
            Generate Questions
          </button>
        )
      )}

      <div className="min-h-[80vh] flex flex-col justify-between  px-6 py-8 relative overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center h-[80vh] items-center">
            <SpinningLoader />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mx-auto w-fit space-x-4 relative mb-10 z-10">
              <div className="absolute top-1/2 transform -translate-y-1/2 w-[100%] h-1 bg-gray-300 z-0 rounded"></div>
              {[...Array(steps)].map((_, index) => {
                const result = stepResults[index];
                return (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition duration-300 ${
                      result === undefined
                        ? "bg-gray-200 border-gray-400"
                        : result
                        ? "bg-green-500 border-green-500 shadow-lg"
                        : "bg-red-500 border-red-500 shadow-lg"
                    }
              `}
                  >
                    {result === null ? (
                      <span className="text-gray-600 font-bold">
                        {index + 1}
                      </span>
                    ) : result ? (
                      <IoCheckmarkOutline className="text-white text-xl" />
                    ) : (
                      <IoClose className="text-white text-xl" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mb-2">
              <p className="text-lg font-semibold">
                Score: {score}/{steps}
              </p>
            </div>

            <div className="flex flex-col items-center text-center z-10">
              <h1 className="text-xl font-semibold mb-6">
                {quiz && quiz[currentStep]?.question}
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {quiz &&
                  quiz[currentStep]?.options.map((ans, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(ans)}
                      className={`px-6 py-3 cursor-pointer border rounded-lg shadow transition duration-200 ${
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

            <div className="flex justify-center z-10 space-x-4">
              {currentStep < steps - 1 && (
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className={`px-6 py-3 rounded-lg  shadow-lg transition duration-300 ${
                    selectedOption === null
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
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
          </>
        )}
      </div>
      {showCompleted && (
        <QuizCompleted
          score={score}
          totalQuestions={quiz.length || 0}
          setShowCompleted={setShowCompleted}
        />
      )}
    </>
  );
};

export default LessonQuiz;
