import { useState } from "react";
import NavbarWelcome from "../components/Navbar/NavbarWelcome";

const Notification = () => {
  const [selectTab, setSelectTab] = useState("today");
  const notification = [
    {id: 1, text: "hello, adipoli", createdAt: "12/2/2025"},
    {id: 2, text: "wow, congratulation on completing coding course ", createdAt: "22/5/2025"}
  ]
  return (
    <>
      <NavbarWelcome />
      <div className="mx-36 mt-10">
        <h2 className="text-3xl font-medium">Notification</h2>
        <div className="flex items-center border-b border-b-gray-300  justify-between mt-3">
          <div className="flex gap-10 ">
            <h4
              onClick={() => setSelectTab("today")}
              className={`${
                selectTab === "today"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 border-b-2 border-transparent"
              } text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              Today
            </h4>
            <h4
              onClick={() => setSelectTab("previous")}
              className={`${
                selectTab === "previous"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 border-b-2 border-transparent"
              } text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              Previous
            </h4>
          </div>
          <div>
            <button className="text-red-500 cursor-pointer">clear all</button>
          </div>
        </div>
        <div className="mt-3">
              {notification.map((noti)=> (
                <div className="flex justify-between space-y-2">
                  <h5>{noti.text}</h5>
                  <small>{noti.createdAt}</small  >
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
