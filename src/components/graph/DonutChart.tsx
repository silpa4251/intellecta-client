// DonutChart.tsx
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import React from 'react';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const data = {
    labels: ['Electronics', 'Clothing', 'Grocery'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [300, 200, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',    // Red
          'rgba(54, 162, 235, 0.7)',    // Blue
          'rgba(255, 206, 86, 0.7)'     // Yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Sales Distribution'
      }
    },
    cutout: '60%', // Makes it a donut
  };

  return (
    <div className="w-full h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
