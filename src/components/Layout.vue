<template>
  <div class="flex gap-5">
    <Sidebar
      v-if="!route.path.includes('signup') && !route.path.includes('login')"
    />

    <!-- flex-1 -->
    <div class="w-full">
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
          <div class="flex justify-between items-center w-full">
            <loans />

            <Insight />
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
// import FirstSection from "./firstSection/components/FirstSection.vue";
import Insight from "./insight.vue";
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
