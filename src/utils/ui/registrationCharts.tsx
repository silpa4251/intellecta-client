import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const sampleData = {
  day: [
    { date: "10AM", count: 5 },
    { date: "12PM", count: 12 },
    { date: "2PM", count: 8 },
  ],
  week: [
    { date: "Mon", count: 20 },
    { date: "Tue", count: 30 },
    { date: "Wed", count: 25 },
    { date: "Thu", count: 40 },
    { date: "Fri", count: 35 },
    { date: "Sat", count: 15 },
    { date: "Sun", count: 22 },
  ],
  month: [
    { date: "Week 1", count: 50 },
    { date: "Week 2", count: 65 },
    { date: "Week 3", count: 80 },
    { date: "Week 4", count: 55 },
  ],
  year: [
    { date: "Jan", count: 30 },
    { date: "Feb", count: 45 },
    { date: "Mar", count: 40 },
    { date: "Apr", count: 60 },
  ],
};

export default function RegistrationStatsCard() {
  const [range, setRange] = useState<"day" | "week" | "month" | "year">("week");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl">Recent Admissions</h1>
        <div className="flex gap-2">
          {["day", "week", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                range === r
                  ? "bg-[#04ce9c] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Last {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData[range]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#04ce9c" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
