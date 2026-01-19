<template>
  <div class="flex md:flex-row flex-col gap-5">
    <Sidebar
      v-if="
        !route.path.includes('signup') &&
        !route.path.includes('login') &&
        !route.path.includes('reset-password') &&
        !route.path.includes('updatePassword')
      "
    />
    <div class="w-full">
      <slot name="header">
        <Header
          v-if="
            !route.path.includes('signup') &&
            !route.path.includes('login') &&
            !route.path.includes('reset-password') &&
            !route.path.includes('updatePassword')
          "
        />
      </slot>

      <div class="md:p-[30px] p-1">
      <!-- <div class="w-full h-full"> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./sidebar/Sidebar.vue";
import Header from "./header/Header.vue";

import { useRoute } from "vue-router";

const route = useRoute();
</script>
