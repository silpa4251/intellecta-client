import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";

type CourseSidebarProps = {
  onClose: ()=> void,
  showsidebar: boolean;
}

const CourseSidebar : React.FC<CourseSidebarProps> = ({ onClose, showsidebar }) => {
  const [showSkillLevel, setShowSkillLevel] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showProgressStatus, setShowProgressStatus] = useState(false);

  return (
    <AnimatePresence>
      {showsidebar && (
        <motion.div
          key="sidebar"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e)=> e.stopPropagation()}
          className="absolute top-[72px] right-0 z-50 min-h-screen w-80 bg-white shadow-xl border-l border-gray-200 p-6 rounded-l-2xl  backdrop-blur-lg"
        >
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold tracking-wide text-gray-800">
              Filters
            </h3>
            <button
              className="text-lg cursor-pointer hover:text-cyan-700 transition-colors"
              onClick={onClose}
            >
              <CgClose />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div
                className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                onClick={() => setShowSkillLevel(!showSkillLevel)}
              >
                <h3 className="font-medium text-gray-800">Skill Level</h3>
                <span
                  className={`text-lg font-bold transform ${
                    showSkillLevel
                      ? "rotate-90 text-cyan-500"
                      : "rotate-0 text-gray-500"
                  } transition-transform duration-300`}
                >
                  <GoChevronRight />
                </span>
              </div>

              {showSkillLevel && (
                <div className="flex flex-col space-y-2 pl-4 pt-3">
                  {["Easy", "Intermediate", "Difficult"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                      />
                      <span className="text-gray-700 group-hover:text-cyan-600 transition-colors">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div
                className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                onClick={() => setShowDuration(!showDuration)}
              >
                <h3 className="font-medium text-gray-800">Duration</h3>
                <span
                  className={`text-lg font-bold transform ${
                    showDuration
                      ? "rotate-90 text-cyan-500"
                      : "rotate-0 text-gray-500"
                  } transition-transform duration-300`}
                >
                  <GoChevronRight />
                </span>
              </div>

              {showDuration && (
                <div className="flex flex-col space-y-2 pl-4 pt-3">
                  {["1 hour", "2 hours", "3 hours"].map((time) => (
                    <label
                      key={time}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                      />
                      <span className="text-gray-700 group-hover:text-cyan-600 transition-colors">
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div
                className="flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                onClick={() => setShowProgressStatus(!showProgressStatus)}
              >
                <h3 className="font-medium text-gray-800">Grade</h3>
                <span
                  className={`text-lg font-bold transform ${
                    showProgressStatus
                      ? "rotate-90 text-cyan-500"
                      : "rotate-0 text-gray-500"
                  } transition-transform duration-300`}
                >
                  <GoChevronRight />
                </span>
              </div>

              {showProgressStatus && (
                <div className="flex flex-col space-y-2 pl-4 pt-3">
                  {["Grade 1", "Grade 2", "Grade 3"].map((grade) => (
                    <label
                      key={grade}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 transition-all"
                      />
                      <span className="text-gray-700 group-hover:text-cyan-600 transition-colors">
                        {grade}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseSidebar;
