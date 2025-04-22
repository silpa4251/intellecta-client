// src/pages/admin/AdminCoursesPage.tsx
import { HoverEffect } from "../../utils/ui/courseCards";
import SearchInput from "../../utils/ui/searchBarCourse";
import { Filter } from "lucide-react";
import AddCourseButton from "../../utils/ui/addcourseButton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import SpinningLoader from "../../components/Loaders/SpinningLoader";
import { useState } from "react";


const fetchAllCourses = async (page: number) => {
  const response = await axios.get(`http://localhost:5005/api/courses?page=${page}&limit=6`); 
  return response.data.data;
};

const AdminCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError } = useQuery({
      queryKey: ["courses", currentPage],
      queryFn: () => fetchAllCourses(currentPage),
      // keepPreviousData: true,
    });
  
    if (isLoading) return <div>Loading courses...</div>;
    if (isError) return <div>Failed to load courses.</div>;

    const { courses, pagination } = data;

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
        <HoverEffect items={courses} />
      </div>
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pagination?.hasPrevPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold mt-2">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              pagination?.hasNextPage ? prev + 1 : prev
            )
          }
          disabled={!pagination?.hasNextPage}
          className="px-4 py-2 bg-blue-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
