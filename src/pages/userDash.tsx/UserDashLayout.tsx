import { useState } from "react";
import UserDashNav from "./userDashNav/UserDashNav";
import DashboardComp from "./userDashComponents/DashboardComp";
import UserCourse from "./userDashComponents/UserCourse";

const UserDashLayout = () => {
  const [string, setString] = useState("Dashboard");

  return (
    <div
    style={{scrollBehavior:"smooth"}}
     className="flex bg-[#ececec] ">
      {/* navigation component */}
      <UserDashNav setString={setString} string={string} />
      {/* outlet component */}
      <div className=" w-full md:px-10 py-5  ">
        <div className="w-ful rounded py-3 px-5 bg-gradient-to-b from-[#081A37] to-[#3A6073] ">
          <h1 className="text-white font-bold ">{string}</h1>
        </div>
        {/* actual outlet */}
        <div className=" w-full ">
          {/* put the outlets here */}
          {(string === "Dashboard") ? <DashboardComp /> : (string === "My Course")? <UserCourse /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default UserDashLayout;
