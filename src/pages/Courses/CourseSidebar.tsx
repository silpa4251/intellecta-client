import React, { useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";


const CourseSidebar = () => {
    const [showSkillLevel, setShowSkillLevel] = useState(false);
    const [showDuration, setShowDuration] = useState(false);
    const [showProgressStatus, setShowProgressStatus] = useState(false);
  return (
    <div className="absolute mt-1 space-y-5 min-w-56 min-h-[100vh] bg-gray-100 ">
          <div className="flex justify-between border-b p-5">
            <h3>Filters</h3>
            <button>Clear all</button>
          </div>
          <div className="space-y-2">
            <div
              className="flex justify-between cursor-pointer  px-3 pb-2"
              onClick={() => setShowSkillLevel(!showSkillLevel)}
            >
              <h3>Skill Level</h3>
              <span>
                {showSkillLevel ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {showSkillLevel && (
              <div className="flex flex-col w-fit p-5">
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Easy</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Intermediate</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Difficult</span>
                </div>
              </div>
            )}
            <div
              className="flex justify-between cursor-pointer border-t  px-3 py-2"
              onClick={() => setShowDuration(!showDuration)}
            >
              <h3>Duration </h3>
              <span>
              {showDuration ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {showDuration && (
              <div className="flex flex-col w-fit p-5">
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>1 hour</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>2 hour</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>3 hour</span>
                </div>
              </div>
            )}
            <div
              className="flex justify-between cursor-pointer  border px-3 py-2"
              onClick={() => setShowProgressStatus(!showProgressStatus)}
            >
              <h3>Grade</h3>
              <span>
                {showProgressStatus ? <FaChevronDown /> : <FaChevronRight />}

              </span>
            </div>
            {showProgressStatus && (
              <div className="flex flex-col w-fit p-5">
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Grade 1</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Grade 2</span>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <span>Grade 3</span>
                </div>
              </div>
            )}
          </div>
        </div>
  )
}

export default CourseSidebar