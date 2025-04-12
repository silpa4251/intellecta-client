import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['5-8', '9-12', '13-18'],
  datasets: [
    {
      label: 'Total',
      data: [30,30,40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(150, 90, 180, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(150, 90, 180, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const DoughnutChart = () => {
    return (
      <div className="w-80 h-80">
        <Doughnut data={data} />
      </div>
    );
  };
  
  export default DoughnutChart;
