// src/pages/admin/AdminCoursesPage.tsx
import { HoverEffect } from "../../utils/ui/courseCards";
import SearchInput from "../../utils/ui/searchBarCourse";
import { Filter } from "lucide-react";
import AddCourseButton from "../../utils/ui/addcourseButton";

const dummyCourses = [
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Physics Fundamentals",
    description: "Explore the laws of motion, energy, and waves.",
    link: "/admin/courses/2",
  },
  {
    title: "Chemistry Basics",
    description: "Understand atoms, molecules, and chemical reactions.",
    link: "/admin/courses/3",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
  {
    title: "Math Mastery",
    description: "Learn advanced algebra, geometry, and calculus.",
    link: "/admin/courses/1",
  },
];

const AdminCoursesPage = () => {
  return (
    <div className="px-6 max-h-[75vh] overflow-y-auto relative scrollbar-hidden">
      <div className="flex justify-between">
        <div className="flex ">
          <Filter />
          <button>Add filter</button>
        </div>
        <div>
        <AddCourseButton/>
        </div>
      </div>
      <br />
      <SearchInput />
      <div>
        <HoverEffect items={dummyCourses} />
      </div>
    </div>
  );
};

export default AdminCoursesPage;
