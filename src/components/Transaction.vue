<template>
  <div class="bg-[#FFFFFF] p-5">
    <h2
      class="font-bold text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px] my-10"
    >
      Transaction History
    </h2>

    <table class="w-full border border-[#800080]">
      <tr>
        <th v-for="(menu, index) in transactionMenu" :key="index">
          {{ menu }}
        </th>
      </tr>

      <tr class="text-center">
        <td class="flex items-center justify-start gap-5">
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
        </td>

        <td>66646</td>
        <td>Money In</td>
        <td>+$3,000</td>
        <td>20 Dec 2022</td>
      </tr>
    </table>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";

const transactionMenu = ref(["Name", "ID", "Status", "Amount", "Detail"]);

</script>
