<template>
  <div class="flex relative">
    <Sidebar />

    <div class="flex-1">
      <slot name="header">
        <Header />
      </slot>

      <!-- <main class="p-8">
        <slot></slot>
      </main> -->

      <div
        v-if="
          route.path.includes('savings') ||
          route.path.includes('loans') ||
          route.path.includes('my-account')
        "
class="p-[50px]"
>
        <slot name="data">
          <div class="flex justify-between" >
            <loans :loanPageProps="loanPageProps" />
            <FirstSection />
          </div>
          <div class="my-[20px]">
            <Transaction />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./sidebar/Sidebar.vue";
import Header from "./header/Header.vue";
import FirstSection from "./firstSection/components/FirstSection.vue";
import Transaction from "./Transaction.vue";
import loans from "./loans.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const loanPageProps = ref({
  savings: {
    status: "Savings",
    amount: 10350040000,
    caption: "Balance Available",
  },
  loan: {
    status: "Loans",
    amount: -10350040000,
    caption: "Amount to be paid",
  },
});

const route = useRoute();
</script>
