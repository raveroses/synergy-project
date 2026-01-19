<template>
  <div>
    <div
      class="w-full flex md:flex-row flex-col justify-between md:items-center gap-3"
    >
      <div
        v-for="(item, index) in cardComponent"
        class="bg-[#FFFF] w-[380px] flex flex-col gap-5 p-5"
        :key="index"
      >
        <div class="flex justify-between">
          <div class="bg-gray-300 text-center p-2 rounded text-[#800080]">
            <component :is="item.icon" />
          </div>

          <div class="flex items-center gap-2 text-green-500">
            <TrendingUp class="" />
            <p>+{{ item.topContent }}%</p>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="font-semibold text-2xl">${{ item.price }}</h2>
          <h3 class="text-sm font-light">{{ item.content }}</h3>
          <p class="text-sm font-light">{{ item.smallContent }}</p>
        </div>
      </div>
    </div>

    <!-- parent -->
  </div>
</template>

<script setup>
import { DollarSign, Recycle, TrendingUp, ChartPie } from "lucide-vue-next";

const cardComponent = [
  {
    icon: DollarSign,
    price: 2450000,
    content: "Total Investment Amount",
    topContent: 12.5,
    smallContent: "",
  },
  {
    icon: TrendingUp,
    price: 320500,
    content: "Total Profit",
    topContent: 8.2,
    smallContent: "Projected: $350,000",
  },
  {
    icon: ChartPie,
    price: 3,
    content: "Active Investments",
    topContent: 12.5,
    smallContent: "18 Portfolios",
  },
  {
    icon: Recycle,
    price: 1850000,
    content: "Matured & Reinvested",
    topContent: 15.3,
    smallContent: "12 Reinvestments",
  },
];
</script>
