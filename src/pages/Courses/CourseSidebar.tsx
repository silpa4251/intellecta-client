import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const CourseSidebar = () => {
  const [showSkillLevel, setShowSkillLevel] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showProgressStatus, setShowProgressStatus] = useState(false);

  return (
    <div className="absolute top-[72px] left-0 min-h-screen w-64 bg-white/10 backdrop-blur-md shadow-lg border-r border-white/20 text-white p-6">
      <div className="flex justify-between items-center border-b border-white/20 pb-3">
        <h3 className="text-lg font-semibold tracking-wide">Filters</h3>
        <button className="text-cyan-400 text-sm hover:underline">
          Clear all
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div
            className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setShowSkillLevel(!showSkillLevel)}
          >
            <h3 className="font-medium">Skill Level</h3>
            <span
              className={`${
                showSkillLevel ? "rotate-90" : "rotate-0"
              } transition-transform duration-300`}
            >
              <FaChevronRight />
            </span>
          </div>
          {showSkillLevel && (
            <div className="flex flex-col space-y-2 pl-4 pt-2">
              {["Easy", "Intermediate", "Difficult"].map((level) => (
                <label
                  key={level}
                  className="flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-all duration-300"
                >
                  <input type="checkbox" className="accent-cyan-400" />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setShowDuration(!showDuration)}
          >
            <h3 className="font-medium">Duration</h3>
            <span
              className={`${
                showDuration ? "rotate-90" : "rotate-0"
              } transition-transform duration-300`}
            >
              <FaChevronRight />
            </span>
          </div>
          {showDuration && (
            <div className="flex flex-col space-y-2 pl-4 pt-2">
              {["1 hour", "2 hours", "3 hours"].map((time) => (
                <label
                  key={time}
                  className="flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-all duration-300"
                >
                  <input type="checkbox" className="accent-cyan-400" />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setShowProgressStatus(!showProgressStatus)}
          >
            <h3 className="font-medium">Grade</h3>
            <span
              className={`${
                showProgressStatus ? "rotate-90" : "rotate-0"
              } transition-transform duration-300`}
            >
              <FaChevronRight />
            </span>
          </div>
          {showProgressStatus && (
            <div className="flex flex-col space-y-2 pl-4 pt-2">
              {["Grade 1", "Grade 2", "Grade 3"].map((grade) => (
                <label
                  key={grade}
                  className="flex items-center space-x-2 cursor-pointer hover:text-cyan-400 transition-all duration-300"
                >
                  <input type="checkbox" className="accent-cyan-400" />
                  <span>{grade}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
