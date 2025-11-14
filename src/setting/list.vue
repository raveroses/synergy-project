<template>
  <h2 class="text-2xl font-bold">Settings</h2>

  <div class="w-full h-0.5 bg-gray-200 my-2"></div>

  <div class="setting flex items-start w-full gap-5 py-5">
    <ul class="w-[20%]">
      <li
        v-for="list in settingLists"
        :key="list.name"
        class="bg-[#800080] mb-4 w-[200px] text-left font-semibold p-2.5 rounded-[5px] text-white"
      >
        {{ list.name }}
      </li>
    </ul>
    <general />
  </div>
</template>

<script setup>
import { ref } from "vue";
import general from "./general.vue";
const settingLists = ref([
  { name: "General", id: "general" },
  { name: "Login & Security", id: "login&security" },
  { name: "Profile", id: "profile" },
]);
</script>
