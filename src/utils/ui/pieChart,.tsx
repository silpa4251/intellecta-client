import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Boys', 'Girls'],
  datasets: [
    {
      label: 'Total',
      data: [40,60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
    return (
      <div className="w-80 h-80"> {/* Adjust size with Tailwind */}
        <Doughnut data={data} />
      </div>
    );
  };
  
  export default DoughnutChart;
