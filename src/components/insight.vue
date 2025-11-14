<template>
  <div class="w-xl h-[478px] bg-[#FFFFFF] p-5">
    <div class="flex justify-between">
      <h2
        class="font-bold text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px]"
      >
        Insights
      </h2>
      <EllipsisVertical class="text-[36px]" />
    </div>

    <BarChat />
  </div>
</template>

<script setup>
import { EllipsisVertical } from "lucide-vue-next";
import BarChat from "../charts/BarChat.vue";
</script>
