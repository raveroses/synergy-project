<template>
  <div
    v-if="
      route.path === '/' ||
      route.path.includes('savings') ||
      route.path.includes('loans')
    "
    class="md:p-[50px] p-2"
  >
    <slot name="data">
      <div
        class="flex md:flex-row flex-col justify-between md:items-start w-full md:gap-0 gap-10"
      >
        <loans />

        <Insight />
      </div>
      <div class="my-5">
        <Transaction />
      </div>
    </slot>
  </div>
</template>
<script setup>
import Insight from "../components/insight.vue";
import Transaction from "../components/Transaction.vue";
import loans from "../components/loans.vue";

import { useRoute } from "vue-router";

const route = useRoute();
</script>
