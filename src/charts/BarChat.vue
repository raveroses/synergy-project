<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { storeToRefs } from "pinia";
import { useTransaction } from "../components/useTransaction";
import { computed, ref } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const fundDetails = useTransaction();
const { transactionHistory, repaymentHistory } = storeToRefs(fundDetails);


const getMonth = (month) => {
  return new Date(month).getMonth();
};
const loanAmount = computed(() => {
  const result = new Array(12).fill(0);

  transactionHistory.value.forEach((item) => {
    if ("loanAmount" in item) {
      const m = getMonth(item.date);
      result[m] += Number(item.loanAmount);
    }
  });
  return result;
});
const savingsAmount = computed(() => {
  const result = new Array(12).fill(0);

  transactionHistory.value.forEach((item) => {
    if ("savingsMoney" in item) {
      const m = getMonth(item.date);
      result[m] += Number(item.savingsMoney);
    }
  });
  return result;
});
const transferAmount = computed(() => {
  const result = new Array(12).fill(0);

  transactionHistory.value.forEach((item) => {
    if ("transferAmount" in item) {
      const m = getMonth(item.date);
      result[m] += Number(item.transferAmount);
    }
  });
  return result;
});

const repaymentAMount = computed(() => {
  const result = new Array(12).fill(0);

  repaymentHistory.value.forEach((item) => {
    const m = getMonth(item.date);
    result[m] += Number(item.amount);
  });
  return result;
});
const months = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const chartData = {
  labels: months.value,
  datasets: [
    {
      data: loanAmount.value,
      label: "Loan",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
      borderRadius: 8,
    },
    {
      data: repaymentAMount.value,

      label: "Repayment",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 1,
      borderRadius: 8,
    },
    {
      data: savingsAmount.value,

      label: "Savings",
      backgroundColor: "rgba(255, 205, 86, 0.5)",
      borderColor: "rgb(255, 205, 86)",
      borderWidth: 1,
      borderRadius: 8,
    },
    {
      data: transferAmount.value,

      label: "Transfer",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 1,
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
};
</script>
