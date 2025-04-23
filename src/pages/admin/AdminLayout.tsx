import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogOutButton from "../../utils/ui/logoutButton";
import UserProfileHover from "../../utils/ui/userProfileHover";
import RadioButtonAdminSideBar from "../../utils/ui/radioButtonAdminSidebar";
import intellectalogo from "../../assets/Intellecta-logo.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationPanel from "./AdminNotifications";
import axiosInstance from "../../utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchStudents, getCurentAdmin } from "./services/services";
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

export interface AdminData {
  _id: string;
  name: string;
  email: string;
  data: object;
}

const AdminLayout = () => {
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate()
  
  const {mutate : logoutMutation} = useMutation({
    mutationFn: async()=> {
        const res = await axiosInstance.post("http://localhost:5000/api/user/admin-logout")
        return res.data
    },
    onSuccess: (data)=> {
      console.log(data);
      
      localStorage.removeItem("isAdmin")
      navigate("/admin_login")
    }
  })

  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const { data: currentLoginedAdmin } = useQuery<{
    success: boolean;
    message: string;
    data: {
      user: AdminData;
    };
  }>({
    queryKey: ["adminData"],
    queryFn: getCurentAdmin,
  });
  

        const name = currentLoginedAdmin?.data?.user?.name || "";
        console.log("currentLoginedAdmin", name)

  useEffect(() => {
    if (students) {
      console.log("Fetched students count:", students?.length  );
    }
  }, [students]);
  
  const currentPage = (() => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/students":
        return "Students";
      case "/admin/courses":
        return "Courses";
        case "/admin/notification":
          return "Notification";  
      default:
        return "Dashboard";
    }
  })();

  const isAddCoursePage = location.pathname === "/admin/addCourse";

  if (isAddCoursePage) {
    return (
      <div className="bg-[#d8ede7] min-h-screen">
        <Outlet />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin_login" replace />;
  }
  

  return (
    <div className="flex justify-between h-screen bg-[#d8ede7]">
      {/* Sidebar */}
      <aside className="w-16 bg-[#d8ede7] flex flex-col items-center py-10 space-y-4">
        {/* Logo */}
        <div className="p-0.5">
          <img src={intellectalogo} alt="intellecta logo" />
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4 justify-center py-30 flex-1">
        <RadioButtonAdminSideBar onNotificationClick={() => setShowNotification(!showNotification)} />
        </nav>

        {/* User Profile & Logout - Stick to Bottom on Desktop */}
        <div className="flex flex-col  space-y-2  mb-4 z-50">
          <UserProfileHover name={name}/>
          <button onClick={()=> logoutMutation()}>

          <LogOutButton />
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1 relative overflow-hidden"> {/* ⭐ Added relative */}
        {/* Header */}
        <header className="px-6 py-8 bg-[#d8ede7] flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-medium flex items-center space-x-0">
              <span>{currentPage}</span>
            </h1>
            <p className="text-sm">Jun 1 - Aug 31, 2024</p>
          </div>
          <div className="text-right">
  <h2 className="text-3xl font-bold">
    {isLoading ? "Loading..." : students?.length}
  </h2>
  <p className="text-sm">Students</p>
</div>
        </header>

        {/* Main Content */}
        <main className="pr-4 flex-1 bg-[#D6EFEB]">
          <Outlet />
        </main>

        {/* Notification Panel */}
        {showNotification && <NotificationPanel onClose={() => setShowNotification(false)} />} {/* ⭐ */}
      </div>
    </div>
  );
};

// Sidebar Icon Component
const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-200">
    {icon}
  </div>
);

export default AdminLayout;
