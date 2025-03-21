
const CircularProgress = ({ percentage = 0, size = 60, stroke = 5 }) => {
  const radius = size / 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =  circumference - (percentage / 100) * circumference;

  return (
    <svg height={size} width={size}>
      <circle
        stroke="#d1d5db"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#22c55e"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-black text-base font-semibold"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
