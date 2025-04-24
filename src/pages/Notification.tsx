import { useState } from "react";
import NavbarWelcome from "../components/Navbar/NavbarWelcome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import SpinningLoader from "../components/Loaders/SpinningLoader";

interface NotificationType {
  createdAt: Date;
  message: string;
  status: string;
  targetType: string;
  title: string;
  type: string;
  updatedAt: Date;
}

const Notification = () => {
  const [selectTab, setSelectTab] = useState("all");
const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "http://localhost:5008/api/notification/get",
        { withCredentials: true }
      );
      return res.data.data;
    },
  });

  const {mutate: markAsRead } = useMutation({
    mutationFn: async (notificationId:string)=> {
      const res = await axiosInstance.patch(`http://localhost:5008/api/notification/mark-as-read`, notificationId)
      return res.data
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ["notification"]})
    }
  })

  const notificationType = [
    { type: "announcement", icon: "📢" },
    { type: "info", icon: "ℹ️" },
    { type: "warning", icon: "⚠️" },
  ];

  return (
    <>
      <NavbarWelcome />
      <div className="mx-36 mt-10">
        <h2 className="text-3xl font-medium">Notification</h2>
        <div className="flex items-center border-b border-b-gray-300 justify-between mt-3">
          <div className="flex gap-10">
            <h4
              onClick={() => setSelectTab("all")}
              className={`${
                selectTab === "all"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 border-b-2 border-transparent"
              } text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              General
            </h4>
            <h4
              onClick={() => setSelectTab("individual")}
              className={`${
                selectTab === "individual"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 border-b-2 border-transparent"
              } text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              Personal
            </h4>
            <h4
              onClick={() => setSelectTab("age-group")}
              className={`${
                selectTab === "age-group"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 border-b-2 border-transparent"
              } text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              Group Notifications
            </h4>
          </div>
        </div>

        <div className="mt-3">
          {isLoading ? (
            <div className="flex justify-center items mt-44">
              <SpinningLoader />
            </div>
          ) : (
            data
              ?.filter(
                (notification: NotificationType) =>
                  selectTab === "all" || notification.targetType === selectTab
              )
              .map((noti: NotificationType) => {
                const typeObj = notificationType.find(
                  (nt) => nt.type === noti.type
                );
                return (
                  <div
                    key={noti.createdAt.toString()}
                    className="flex justify-between py-4 border-b border-gray-200"
                  >
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        {typeObj && <span className={`text-lg  ${typeObj.type === "announcement" && "-rotate-12"}`}>{typeObj.icon}</span>}
                        <h5 className="font-semibold text-lg">{noti.title}</h5>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-700">{noti.message}</p>
                        <small className="text-gray-500">
                          {new Date(noti.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
