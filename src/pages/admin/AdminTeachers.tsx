import React from 'react'
import DeleteButton from "../../utils/ui/deleteButton";

const studentData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    dob: "2001-05-12",
    mobile: "9876543210",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "2000-01-01",
    mobile: "1234567890",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=1",
  },
  // Repeat / extend more students as needed
];

const AdminTeachers = () => {

  const handleDelete = (id: number) => {
    console.log("Delete student with ID:", id);
  };

  return (
    <div className="p-6">
      <div className="rounded-4xl  overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] ">
        <div className="max-h-[75vh] overflow-y-auto relative scrollbar-hide ">
          <table className="w-full table-fixed  ">
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
              {studentData.map((student, index) => (
                <tr
                  key={student.id + index}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0
                      ? "bg-[#BBD2CB] text-[#4F4F4F] hover:bg-[#ffffff] hover:text-[#4F4F4F]"
                      : "bg-[#ffffff] text-[#4F4F4F] hover:bg-[#BBD2CB] hover:text-[#4F4F4F]"
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.dob}</td>
                  <td className="p-4">{student.mobile}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(student.id)}
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
}

export default AdminTeachers



