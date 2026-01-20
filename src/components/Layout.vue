<template>
  <div class="flex md:flex-row flex-col gap-5 md:static relative">
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
      <div class="md:hidden my-4 mx-2 text-[#800080] text-2xl">
        <LayoutDashboard />
      </div>
      <div class="md:p-[30px] p-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./sidebar/Sidebar.vue";
import Header from "./header/Header.vue";

import { useRoute } from "vue-router";
import { LayoutDashboard } from "lucide-vue-next";

const route = useRoute();
</script>
