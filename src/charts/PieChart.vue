<template>
  <div class="flex justify-between">
    <div class="w-[500px] bg-gray-200 rounded p-10">
      <Pie :data="chartData.pie" :options="chartOptions.pie" />
    </div>
    <div class="w-[400px] bg-gray-200 rounded p-10">
      <Doughnut :data="chartData.doughnut" :options="chartOptions.doughnut" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Pie, Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = ref({
  pie: {
    labels: ["real estate", "stock", "bonds"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  doughnut: {
    labels: ["real estate", "stock", "bonds"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

const chartOptions = ref({
  pie: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Investment Chart",
      },
    },
  },
  doughnut: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Investments Chart",
      },
    },
  },
});

// Randomize function
// const randomize = () => {
//   chartData.value.datasets[0].data = chartData.value.labels.map(() =>
//     Math.floor(Math.random() * 100)
//   );
// };
</script>
