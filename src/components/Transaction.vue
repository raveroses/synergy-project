<template>
  <div class="bg-[#FFFFFF] p-5">
    <h2
      class="font-bold
       text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px] my-10"
    >
      Transaction History
    </h2>

    <div
      class="flex justify-between items-center border-[0.95px] border-[#EAECF0] rounded-[7px] p-3"
    >
      <div v-for="(menu, index) in transactionMenu" :key="index">
        {{ menu }}
      </div>
    </div>

    <div
      class="flex items-center justify-between border-[0.95px] border-[#EAECF0] rounded-[7px] p-2 mt-2.5"
    >
      <div class="flex items-center gap-5">
        <Img
          src="/images/bene.jpg"
          alt="images-of-beneficiaries"
          class="w-[38.64px] h-[38.64px] rounded-[193.19px]"
        />
        <h2
          class="font-bold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
        >
          Kathlyn man
        </h2>
      </div>
      <h2>66646</h2>
      <h2>Money In</h2>
      <h2>+$3,000</h2>
      <h2>20 Dec 2022</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const transactionMenu = ref(["Name", "ID", "Status", "Amount", "Detail"]);
</script>
