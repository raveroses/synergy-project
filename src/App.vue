<template>
  <div class="flex relative">
    <Sidebar />
    <router-view></router-view>

    <div>
      <Header />
      <div class="p-[50px]">
        <div class="flex gap-[100px] w-[1004px] h-[478px]">
          <loans :loanPageProps="loanPageProps" />
          <FirstSection />
        </div>
        <Transaction />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import Header from "./components/header/Header.vue";
import FirstSection from "./components/firstSection/firstSection.vue";
import Transaction from "./components/firstSection/components/Transaction.vue";
import loans from "./components/firstSection/components/loans.vue";
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
