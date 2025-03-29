import React from "react";
import {
  MdCalculate,
  MdCode,
  MdMenuBook,
  MdPublic,
  MdScience,
} from "react-icons/md";
import { Link } from "react-router-dom";

const topThreePrograms = [
  {
    id: 1,
    icon: <MdMenuBook className="text-3xl text-gray-700" />,
    title: "Reading & Writing",
    category:"english",
    description:
      "Boost literacy with storytelling, writing, and guided reading.",
  },
  {
    id: 2,
    icon: <MdCalculate className="text-3xl text-gray-700" />,
    title: "Maths & Logics",
    category:"maths",
    description: "Master math through quizzes and real-world problem-solving.",
  },
  {
    id: 3,
    icon: <MdMenuBook className="text-3xl text-gray-700" />,
    title: "Reading & Writing",
    category:"english",
    description:
      "Boost literacy with storytelling, writing, and guided reading.",
  },
];

const bottomFourPrograms = [
  {
    id: 4,
    icon: <MdScience className="text-3xl text-gray-700" />,
    title: "Science & Exploration",
    category:"science",
    description: "Explore science through hands-on experiments and discovery.",
  },
  {
    id: 5,
    icon: <MdCode className="text-3xl text-gray-700" />,
    title: "Coding for Kids",
    category:"coding",
    description: "Learn programming with resources.",
  },
  {
    id: 6,
    icon: <MdPublic className="text-3xl text-gray-700" />,
    title: "History & Cultures",
    category:"history",
    description: "Explore history and cultures through interactive stories.",
  },
  {
    id: 7,
    icon: <MdPublic className="text-3xl text-gray-700" />,
    title: "History & Cultures",
    category:"history",
    description: "Explore history and cultures through interactive stories.",
  },
];


const Programs: React.FC = () => {
  return (
    <div
      className="flex flex-wrap space-x-10 space-y-10 mx-28 my-10"
    >
      <div className="max-w-xs flex-1 space-y-1 min-w-[300px]">
        <h2 className="text-3xl font-semibold">Our Programs For Your Kids</h2>
        <p className="font-medium text-gray-600">
          Engaging educational programs designed to foster creativity and
          critical thinking in children. Each course offers interactive lessons,
          hands-on activities, and expert guidance to help your child develop
          essential skills for the future.
        </p>
        <button className="cursor-pointer bg-[#F7D232] px-4 py-2 rounded-md font-semibold shadow-md mt-4">
          Select One
        </button>
      </div>

      {topThreePrograms.map((program) => (
        <Link to={`/courses/${program.category}`}>
          <div
            key={program.id}
            className="w-[275px] h-[275px] bg-white border cursor-pointer hover:border-yellow-400 hover:border-2 border-[#F7D232] p-5 rounded-2xl shadow-md flex flex-col justify-center items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-[#FFF7D1] rounded-full mb-4">
              {program.icon}
            </div>
            <h3 className="text-lg font-bold text-center">{program.title}</h3>
            <p className="text-sm text-center text-gray-600">
              {program.description}
            </p>
          </div>
        </Link>
      ))}

      <div className="space-x-13 flex">
        {bottomFourPrograms.map((program) => (
          <Link to={`/courses/${program.category}`}>
            <div
              key={program.id}
              className="w-[275px] h-[275px] bg-white border cursor-pointer hover:border-yellow-400 hover:border-2 border-[#F7D232] p-5 rounded-2xl shadow-md flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#FFF7D1] rounded-full mb-4">
                {program.icon}
              </div>
              <h3 className="text-lg font-bold text-center">{program.title}</h3>
              <p className="text-sm text-center text-gray-600">
                {program.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Programs;
