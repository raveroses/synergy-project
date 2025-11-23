<template>
  <div class="flex relative">
    <Sidebar
      v-if="!route.path.includes('signup') && !route.path.includes('login')"
    />

    <div class="flex-1">
      <slot name="header">
        <Header
          v-if="!route.path.includes('signup') && !route.path.includes('login')"
        />
      </slot>

      <div
        v-if="
          route.path === '/' ||
          route.path.includes('savings') ||
          route.path.includes('loans')
        "
        class="p-[50px]"
      >
        <slot name="data">
          <div class="flex justify-between">
            <loans />
            <FirstSection />
          </div>
          <div class="my-5">
            <Transaction />
          </div>
        </slot>
      </div>
      <div v-else class="p-[30px]">
        <router-view />
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
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

// const loanPageProps = ref({
//   savings: {
//     status: "Savings",
//     amount: 10350040000,
//     caption: "Balance Available",
//   },
//   loan: {
//     status: "Loans",
//     amount: -10350040000,
//     caption: "Amount to be paid",
//   },
// });

const route = useRoute();

// console.log(route.path);
// console.log(route.path.includes("signup"));
// const currentPath = ref("");

// watchEffect(() => {
//   currentPath.value = route.path;
// });
</script>
