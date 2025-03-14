import { useState } from "react";
import WcNavbar from "../components/Navbar/NavbarWelcome";
import { IoCheckmarkOutline } from "react-icons/io5";

const questions = [
  { id: 1, text: "Which number completes the pattern?", pattern: "2, 4, 8, 16, _", options: ["24", "20", "32", "18"], answer: "32" },
  { id: 2, text: "What is the capital of France?", pattern: "", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { id: 3, text: "Solve: 12 + 15", pattern: "", options: ["25", "27", "30", "32"], answer: "27" },
  { id: 4, text: "What comes next in the sequence?", pattern: "A, C, E, G, _", options: ["I", "H", "J", "K"], answer: "I" },
  { id: 5, text: "What is 9 x 9?", pattern: "", options: ["72", "81", "90", "99"], answer: "81" },
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
    <div>
      <WcNavbar />
      <div className="mx-36">
        <h2 className="text-xl font-semibold mt-10">Your Initial Assessment</h2>
        <div className="flex justify-between mt-5">
          <button className="bg-[#349EFF] text-white rounded-md px-3 font-semibold">
            Maths & Logic
          </button>
          <div className="flex items-center space-x-4 z-20 relative">
            <div className="w-full absolute h-1 bg-gray-300 -z-10"></div>
            {[...Array(steps)].map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400 bg-white"
                }`}
              >
                {index <= currentStep && (
                  <span className="text-white text-2xl font-bold">
                    <IoCheckmarkOutline />
                  </span>
                )}
              </div>
            ))}
          </div>
          <h3>Question {currentStep + 1}/{steps}</h3>
        </div>
        <div className="shadow-lg border px-4 pb-5 rounded-xl mt-8 min-h-[300px]">
          <h2 className="font-bold text-2xl">Q {currentStep + 1}</h2>
          <div className="flex justify-center flex-col items-center min-h-14">
            <h3 className="font-semibold text-lg">{questions[currentStep].text}</h3>
            {questions[currentStep].pattern && (
              <h3 className="font-semibold text-xl">{questions[currentStep].pattern}</h3>
            )}
          </div>
          <div className="flex flex-wrap max-w-3xl justify-center mx-auto items-center gap-5 mt-5">
            {questions[currentStep].options.map((option, index) => (
              <div
                key={index}
                className="w-[300px] flex justify-between items-center border border-gray-400 px-2 py-3 rounded-md shadow-md cursor-pointer"
              >
                <h4>{String.fromCharCode(65 + index)}. {option}</h4>
                <div className="flex items-center justify-center bg-gray-300 border border-gray-600 w-10 h-10 rounded-full">
                  <button className="absolute bg-gray-50 w-8 h-8 rounded-full border border-gray-600"></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-8">
          <button
            className="bg-[#F7D232] p-2 rounded-md cursor-pointer text-lg font-semibold w-[150px] shadow-md"
            onClick={handleNext}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
