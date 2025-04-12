import LearningCards from "../../../components/cards/learingCards/LearningCards";
import Card from "../../../components/cards/uiCard/Card";
import BarChart from "../../../components/graph/BarChart";
import DonutChart from "../../../components/graph/DonutChart";
import LineChart from "../../../components/graph/LineChart";

const DashboardComp = () => {
  return (
    <div className="w-full h-full mt-5">
      {/* ===================================== */}
      <div className=" md:p-5 rounded-xl bg-white shadow-xl">
        <div className="text-lg font-semibold">
          <h1>Overview</h1>
        </div>
        <div className="flex justify-evenly  items-center text-white font-bold flex-wrap w-full">
          <Card mainHead={"Course Attempted"} value={10} />
          <Card mainHead={"Course Pending"} value={10} />
          <Card mainHead={"Course Completed"} value={10} />
          <Card mainHead={"Course Badge"} value={10} />
          <Card mainHead={"Quize Attempted"} value={10} />
        </div>
        <div>{/* empty now */}</div>
      </div>
      {/* ========================================== */}

      <div className="w-full  h-full flex gap-5 mt-10 md:flex-nowrap flex-wrap">
        <div className=" md:p-5  rounded-xl ">
          <div>
            <h1 className="text-lg font-semibold ">Continue Learning</h1>
          </div>
          <div className="flex flex-col gap-2 mt-3 ">
            {/* cards here */}
            <LearningCards />
            <LearningCards />
            <LearningCards />
            <LearningCards />
          </div>
          <div className="w-full h-96 bg-white rounded-xl mt-5 shadow-2xl">
            {/* donut graph */}
            <DonutChart />
          </div>
        </div>
        <div className="bg-white md:p-4 rounded-xl w-full ">
          <div>
            <h1 className="text-lg font-semibold">Learning Statistics</h1>
          </div>
          <div className="w-full h-full flex  justify-center  flex-col items-center">
            {/* bar graph */}
            <div className="md:h-[30rem] md:w-[50rem]  ">
              <BarChart />
            </div>
            {/* line graph */}
            <div className="md:h-[30rem] md:w-[50rem] ">
            <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
