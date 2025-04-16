import DoughnutChart from "../../utils/ui/pieChart,";
import RegistrationStatsCard from "../../utils/ui/registrationCharts";
import { PopularModulesCard } from "../../utils/ui/popularModules";
import { ActiveUsersCard } from "../../utils/ui/activeUsers";
import { TopPerformingStudentsCard } from "../../utils/ui/topPerformingStudents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAdminDashboard } from "./services/services";
import AllStudentsLoader from "../../utils/ui/allStudentsLoader";

interface CountData {
  date: string;
  count: number;
}

interface DashboardResponse {
  success: boolean;
  message: string;
  studentsCountData: {
    first: number;
    second: number;
    third: number;
    total: number;
  };
  userRegistrationData: {
    day: CountData[];
    week: CountData[];
    month: CountData[];
    year: CountData[];
  };
}

const AdminDashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useQuery<DashboardResponse>({
    queryKey: ["students"],
    queryFn: fetchAdminDashboard,
  });

  console.log(dashboardData);

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
    <div className="max-h-[80vh] overflow-auto p-4 scrollbar-hide">
      <div className="grid grid-cols-10 gap-3">
        {/* Row 1 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto  w-full col-span-4 scrollbar-hide">
          <div className="flex justify-between">
            <h1 className="font-medium text-2xl">Total Students</h1>
          </div>
          <div className="flex justify-center items-center mt-10">
            {dashboardData?.studentsCountData && (
              <DoughnutChart
                studentsCountData={dashboardData.studentsCountData}
              />
            )}{" "}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
          <h1 className="font-semibold text-2xl mb-4">Stats</h1>
          {dashboardData?.userRegistrationData && (
            <RegistrationStatsCard
              userRegistrationData={dashboardData?.userRegistrationData}
            />
          )}
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-4 scrollbar-hide">
          <PopularModulesCard />
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 overflow-auto h-[40vh] w-full col-span-6 scrollbar-hide">
          <TopPerformingStudentsCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
