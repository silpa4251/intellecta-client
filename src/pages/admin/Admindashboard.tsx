import DoughnutChart from "../../utils/ui/pieChart,";
import RegistrationStatsCard from "../../utils/ui/registrationCharts";
import { PopularModulesCard } from "../../utils/ui/popularModules";
import { ActiveUsersCard } from "../../utils/ui/activeUsers";
import { TopPerformingStudentsCard } from "../../utils/ui/topPerformingStudents";

const AdminDashboard = () => {
  return (
    <div className="max-h-[80vh] overflow-auto p-4 scrollbar-hide">
      <div className="grid grid-cols-10 gap-3">
        {/* Row 1 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto  w-full col-span-4 scrollbar-hide">
          <div className="flex justify-between">
            <h1 className="font-medium text-2xl">Total Students</h1>
          </div>
          <div className="flex justify-center items-center mt-10">
            <DoughnutChart />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
          <h1 className="font-semibold text-2xl mb-4">Stats</h1>
          <RegistrationStatsCard/>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-4 scrollbar-hide">
          <PopularModulesCard/>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-6 scrollbar-hide">
        <TopPerformingStudentsCard/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
