// BarChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart:React.FC = () => {
  const data = {
    labels: ['coding', 'coding', 'coding', 'coding'],
    datasets: [
      {
        label: 'Learning',
        data: [65, 59, 80, 81],
        backgroundColor: ['rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',   // Red
        'rgba(54, 162, 235, 0.6)',   // Blue
        'rgba(255, 206, 86, 0.6)',   // Yellow
        'rgba(75, 192, 192, 0.6)', 
        ],
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: '' }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
