import React, { useMemo, useState } from "react";
import DeleteButton from "../../utils/ui/deleteButton";
import { fetchStudents } from "./services/services";
import { useQuery } from "@tanstack/react-query";
import AllStudentsLoader from "../../utils/ui/allStudentsLoader";

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  profilePic?: string;
  role: "student";
  createdAt: string;
  updatedAt: string;
}

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const handleDelete = (id: number) => {
    console.log("Delete student with ID:", id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFilter(e.target.value);
  };

  const filteredStudents = useMemo(() => {
    if (!students) return [];

    return students.filter((student:Student) => {
      const inSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const inAgeGroup = (() => {
        if (!ageFilter) return true;

        const age = student.age;
        if (ageFilter === "5-8") return age >= 5 && age <= 8;
        if (ageFilter === "9-12") return age >= 9 && age <= 12;
        if (ageFilter === "13-18") return age >= 13 && age <= 18;
        return true;
      })();

      return inSearch && inAgeGroup;
    });
  }, [students, searchTerm, ageFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <AllStudentsLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load students. {String(error)}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/2"
        />

        <select
          value={ageFilter}
          onChange={handleAgeFilterChange}
          className="border border-gray-300 p-2 rounded-md w-full md:w-[200px]"
        >
          <option value="" className="hover:bg-[#787878]">All Age Groups</option>
          <option value="5-8" className="hover:bg-[#787878]">Age 5-8</option>
          <option value="9-12" className="hover:bg-[#787878]">Age 9-12</option>
          <option value="13-18" className="hover:bg-[#787878]">Age 13-18</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-4xl shadow overflow-hidden">
        <div className="max-h-[65vh] overflow-y-auto relative scrollbar-hide">
          <table className="w-full table-fixed">
            <thead className="bg-[#789A94] sticky top-0 z-10 text-sm text-white">
              <tr>
                <th className="p-4 w-[100px]">Image</th>
                <th className="p-4 w-[150px]">Name</th>
                <th className="p-4 w-[200px]">Email</th>
                <th className="p-4 w-[120px]">Age</th>
                <th className="p-4 w-[140px]">Mobile</th>
                <th className="p-4 w-[100px]">Status</th>
                <th className="p-4 w-[100px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div className="flex justify-center items-center h-[75vh] w-screen">
                  <AllStudentsLoader />
                </div>
              ) : (
                students?.length > 0 &&
                students?.map((student: Student, index: number) => (
                  <tr
                    key={student._id + index}
                    className={`transition-colors duration-200 ${
                      index % 2 === 0
                        ? "bg-[#BBD2CB] text-[#4F4F4F] "
                        : "bg-[#ffffff] text-[#4F4F4F] "
                    }`}
                  >
                    <td className="p-4">
                      <img
                        src={student.profilePic}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.email}</td>
                    <td className="p-4">{student.age}</td>
                    <td className="p-4">{student.phone}</td>
                    <td className="p-4">
                      <span
                      //   className={`px-2 py-1 rounded-full text-xs font-medium
                      //     ${
                      //     student.status === "Active"
                      //       ? "bg-green-100 text-green-600"
                      //       : "bg-red-100 text-red-600"
                      //   }
                      //   `
                      // }
                      >
                        active
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        // onClick={() => handleDelete(student._id)}
                        className="text-red-500 hover:text-red-700 transition font-medium"
                      >
                        <DeleteButton />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
