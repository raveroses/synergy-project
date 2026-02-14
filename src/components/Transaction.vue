<template>
  <div class="bg-[#FFFFFF] md:p-5 p-2">
    <h2
      class="font-bold text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px] my-10"
    >
      Transaction History
    </h2>
    <div
      class="flex justify-end text-[14px] font-bold cursor-pointer"
      @click="handleSeeAll"
    >
      <div>See All</div>
    </div>
    <div class="table-container">
      <table class="w-full border border-[#800080]">
        <thead>
          <tr>
            <th v-for="(menu, index) in transactionMenu" :key="index">
              {{ menu }}
            </th>
          </tr>
        </thead>
        <tbody class="w-full h-[100px]">
          <tr class="text-center" v-for="history in displayLimitHistory">
            <td class="flex items-center justify-start gap-5">
              <img
                src="/images/bene.jpg"
                alt="images-of-beneficiaries"
                class="w-[38.64px] h-[38.64px] rounded-[193.19px]"
              />
              <h2
                class="font-bold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
              >
                {{ history.accountName || profileStore.first_name }}
              </h2>
            </td>

            <td>{{ history.id || history.plans.id }}</td>
            <td v-if="'loanAmount' in history">loan</td>
            <td v-else-if="'savingsMoney' in history">savings</td>
            <td v-else-if="'amount' in history">repayment</td>
            <td v-else-if="'plans' in history">Utility</td>
            <td v-else>Transfer</td>
            <td>
              {{
                history.amount ||
                history.savingsMoney ||
                history.loanAmount ||
                history.transferAmount ||
                history.plans.price
              }}
            </td>
            <td>{{ history.date.split("T")[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useTransaction } from "./useTransaction";
import { useCreateClient } from "../_supabase/useCreateClient.js";
const transactionMenu = ref(["Name", "ID", "Status", "Amount", "Detail"]);

const fundsDetail = useTransaction();
const store = useCreateClient();
const { profileStore } = storeToRefs(store);
const { allHistory } = storeToRefs(fundsDetail);

let displayLimit = ref(5);
let displayLimitHistory = computed(() =>
  allHistory.value.slice(0, displayLimit.value),
);

const handleSeeAll = () => {
  return (displayLimit.value = allHistory.value.length);
};
</script>
