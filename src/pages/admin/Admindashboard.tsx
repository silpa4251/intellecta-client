import { MoreVertical } from "lucide-react";
import SelectClassButton from "../../utils/ui/classRadiobutton";
import DoughnutChart from "../../utils/ui/pieChart,";

const AdminDashboard = () => {
  return (
    <div className="max-h-[80vh] overflow-auto p-4 scrollbar-hide">
      <div className="grid grid-cols-10 gap-3">
        {/* Row 1 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[50vh] w-full col-span-4 scrollbar-hide">
          <div className="flex justify-between">
            <h1 className="font-medium text-2xl">Total Students</h1>
            <SelectClassButton />
          </div>
          <div className="flex justify-center items-center h-[350px]">
            <DoughnutChart />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
          <h1 className="font-semibold text-2xl mb-4">Teachers List</h1>

          {/* Scrollable Table */}
          <div className="overflow-y-auto h-[250px] border border-gray-300 rounded-lg  scrollbar-hide">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white shadow-sm">
                <tr className="border-b border-gray-300 text-gray-600">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Muhammed Faris",
                    class: "Class 6",
                    subject: "English",
                    email: "muhammed@gmail.com",
                  },
                  {
                    name: "Moris Philippe",
                    class: "Class 6",
                    subject: "English",
                    email: "moris@gmail.com",
                  },
                  {
                    name: "Moris Philippe",
                    class: "Class 6",
                    subject: "English",
                    email: "moris@gmail.com",
                  },
                  {
                    name: "Moris Philippe",
                    class: "Class 6",
                    subject: "English",
                    email: "moris@gmail.com",
                  },
                  {
                    name: "Moris Philippe",
                    class: "Class 6",
                    subject: "English",
                    email: "moris@gmail.com",
                  },
                  {
                    name: "Moris Philippe",
                    class: "Class 6",
                    subject: "English",
                    email: "moris@gmail.com",
                  },
                ].map((teacher, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:scale-105 transition duration-300">
                    {/* Profile */}
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-700">{teacher.name}</span>
                    </td>

                    {/* Other Columns */}
                    <td className="py-4 px-4 text-gray-600">{teacher.class}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {teacher.subject}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{teacher.email}</td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center">
                      <MoreVertical className="cursor-pointer text-gray-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-4">
          Card 3
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-6">
          Card 4
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
