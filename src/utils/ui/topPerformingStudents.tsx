type Student = {
    name: string;
    score: number;
  };
  
  const topStudents: Student[] = [
    { name: "Alice Johnson", score: 98 },
    { name: "Mohammed Rizwan", score: 95 },
    { name: "Sara Lee", score: 93 },
    { name: "David Kim", score: 90 },
    { name: "Emily Garcia", score: 89 },
  ];
  
  export function TopPerformingStudentsCard() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full col-span-6">
        <h2 className="text-2xl font-semibold mb-4">Top Performing Students</h2>
        <ul className="divide-y divide-gray-200">
          {topStudents.map((student, index) => (
            <li
              key={student.name}
              className="flex justify-between py-2 items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  #{index + 1}
                </span>
                <span className="text-base font-semibold">{student.name}</span>
              </div>
              <span className="text-[#04ce9c] font-medium">{student.score}%</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  