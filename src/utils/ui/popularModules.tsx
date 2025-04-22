import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  const moduleData = [
    { name: "Math AI Tutor", usage: 120 },
    { name: "Science Bot", usage: 95 },
    { name: "English Assistant", usage: 80 },
    { name: "History Genie", usage: 60 },
    { name: "Coding Helper", usage: 45 },
  ];
  
  export function PopularModulesCard() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
        <h2 className="text-2xl font-semibold mb-4">Popular Modules</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  