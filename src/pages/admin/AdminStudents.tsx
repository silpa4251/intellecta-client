import React, { useEffect, useState } from "react";
import DeleteButton from "../../utils/ui/deleteButton";
import { fetchStudents } from "./services/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  console.log(students);

  const handleDelete = (id: number) => {
    console.log("Delete student with ID:", id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <AllStudentsLoader/>
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
      <div className="rounded-4xl shadow overflow-hidden">
        <div className="max-h-[75vh] overflow-y-auto relative scrollbar-hide">
          <table className="w-full table-fixed">
            <thead className="bg-[#789A94] sticky top-0 z-10 text-sm text-white">
              <tr>
                <th className="p-4 w-[100px]">Image</th>
                <th className="p-4 w-[150px]">Name</th>
                <th className="p-4 w-[200px]">Email</th>
                <th className="p-4 w-[120px]">DOB</th>
                <th className="p-4 w-[140px]">Mobile</th>
                <th className="p-4 w-[100px]">Status</th>
                <th className="p-4 w-[100px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students && students?.map((student, index) => (
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
                      src={
                        student.profilePic
                      }
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
