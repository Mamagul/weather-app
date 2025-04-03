import React from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const WeatherChart = ({ forecast }) => {
  if (!forecast) return null; // Если данных нет, не рендерим график

  // 1️⃣ Создаём массив с временными метками (часы + дата)
  const labels = forecast.map((entry) =>
    new Date(entry.dt * 1000).toLocaleString("en-US", {
      weekday: "short",
      hour: "2-digit",
      hour12: true,
    })
  );

  console.log(forecast);
  console.log(labels);
  // 2️⃣ Создаём массив с температурами
  const temperatures = forecast.map((list) => list.main.temp);
  console.log(temperatures);
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature chart (°C)",
        data: temperatures,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "rgb(0, 0, 0)",
        },
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },

      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          enabled: false,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "rgb(0, 0, 0)",
        },
        border: {
          color: "rgb(0, 0, 0)",
        },
        beginAtZero: false,
      },
      x: {
        min: 0,
        max: 10,
        ticks: {
          color: "rgb(0, 0, 0)",
          autoSkip: false,
        },
        border: {
          color: "rgb(0, 0, 0)",
        },
      },
    },
  };

  return (
    <div style={{ width: "60vw", height: "40vh" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
