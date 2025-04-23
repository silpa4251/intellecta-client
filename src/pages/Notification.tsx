import { useState } from "react";
import NavbarWelcome from "../components/Navbar/NavbarWelcome";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "http://localhost:5008/api/notification/get",
        { withCredentials: true }
      );
      console.log(res.data);
      return res.data.data;
    },
  });
  console.log(data);

  return (
    <>
      <NavbarWelcome />
      <div className="mx-36 mt-10">
        <h2 className="text-3xl font-medium">Notification</h2>
        <div className="flex items-center border-b border-b-gray-300  justify-between mt-3">
          <div className="flex gap-10 ">
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
          <div>
            <button className="text-red-500 cursor-pointer">clear all</button>
          </div>
        </div>
        <div className="mt-3">
          {isLoading ? <div className="flex justify-center items mt-44"><SpinningLoader/></div> : 
          data
            ?.filter((notification: NotificationType) => notification.targetType === selectTab)
            .map((noti: NotificationType) => (
              <div
                key={noti.createdAt.toString()}
                className="flex justify-between space-y-2"
              >
                <h5>{noti.title}</h5>
                <small>{new Date(noti.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
