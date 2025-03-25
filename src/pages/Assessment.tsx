import { useState } from "react";
import WcNavbar from "../components/Navbar/NavbarWelcome";
import { IoCheckmarkOutline } from "react-icons/io5";

const questions = [
  { id: 1, text: "Which number completes the pattern?", pattern: "2, 4, 8, 16, _", options: ["24", "20", "32", "18"], answer: "32" },
  { id: 2, text: "What is the capital of France?", pattern: "", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { id: 3, text: "Solve: 12 + 15", pattern: "", options: ["25", "27", "30", "32"], answer: "27" },
  { id: 4, text: "What comes next in the sequence?", pattern: "A, C, E, G, _", options: ["I", "H", "J", "K"], answer: "I" },
  { id: 5, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 6, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 7, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 8, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 9, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 10, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 11, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 12, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 13, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 14, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
  { id: 15, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },

];

const Assessment = () => {
  const steps = questions.length;
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <WcNavbar />
      <div className="max-w-full px-4 pb-4 md:mx-20 lg:mx-36">
        <h2 className="text-xl md:text-2xl font-bold mt-8 text-center">Your Initial Assessment</h2>
        <div className="flex flex-col sm:flex-row items-center mt-4 md:mt-8 gap-4 md:gap-16">
          <div className="bg-[#349EFF] text-white rounded-md px-2 py-1 md:px-3 md:py-2 font-semibold">Maths & Logic</div>
          <div className="flex items-center space-x-2 md:space-x-4 relative">
            <div className="w-full absolute h-1 bg-gray-300 -z-10"></div>
            {[...Array(steps)].map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center ${
                  index <= currentStep ? "bg-green-500 border-green-500" : "border-gray-400 bg-white"
                }`}
              >
                {index <= currentStep && <IoCheckmarkOutline className="text-white text-lg sm:text-2xl" />}
              </div>
            ))}
          </div>
          <h3 className="text-sm sm:text-base">Question {currentStep + 1}/{steps}</h3>
        </div>
        <div className="shadow-lg border px-5 pb-5 rounded-xl mt-4 md:mt-10">
          <h2 className="font-bold text-lg sm:text-2xl md:p-2">Q.{currentStep + 1}</h2>
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-semibold text-base sm:text-lg mt-3 md:mt-0">{questions[currentStep].text}</h3>
            {questions[currentStep].pattern && (
              <h3 className="font-semibold text-lg sm:text-xl">{questions[currentStep].pattern}</h3>
            )}
          </div>
          <div className="flex flex-wrap max-w-full md:max-w-3xl justify-center mx-auto items-center gap-4 md:gap-5 mt-5">
            {questions[currentStep].options.map((option, index) => (
              <div
                key={index}
                className="w-full sm:w-[300px] flex justify-between items-center border border-gray-400 px-2 py-3 rounded-md shadow-md cursor-pointer"
              >
                <h4>{String.fromCharCode(65 + index)}. {option}</h4>
                <div className="flex items-center justify-center bg-gray-800 border border-gray-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                  <button className="absolute bg-gray-50 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-600"></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end sm:gap-5 mt-4 md:mt-8">
          <button
            className="bg-[#F7D232] p-2 rounded-md cursor-pointer text-base sm:text-lg font-semibold w-[120px] sm:w-[150px] shadow-md mb-2"
            onClick={handleNext}
          >
            NEXT
          </button>
        </div>
      </div>
    </>
  );
};

export default Assessment;
