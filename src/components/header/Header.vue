<template>
  <header class="bg-[#FFFFFF] w-full flex justify-between p-3">
    <div class="text-2xl font-bold text-[#800080] block md:hidden">
      <h1>Synergy</h1>
    </div>
    <div class="md:flex items-center md:gap-5 gap-2 hidden">
      <h1
        class="font-bold md:text-[23.18px] text-[20px] leading-[30.91px] text-[#101828]"
      >
        {{ dateSetter }}
      </h1>
      <div
        class="w-[38.64px] h-[38.64px]"
        v-if="
          dateSetter.toLowerCase() === 'good morning' ||
          dateSetter.toLowerCase() === 'good afternoon'
        "
      >
        <sunsetSvg />
      </div>

      <div class="w-10" v-else="dateSetter.toLowerCase() === 'good evening'">
        <Moon />
      </div>
    </div>
    <div class="flex gap-5 text-[18px] items-center">
      <div class="notification">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      </div>
      <div class="image w-[46.37px] h-[46.37px] md:hidden block">
        <img
          :src="imageGetter"
          alt="winpenn-image"
          class="w-full h-full rounded-full object-cover"
        />
      </div>
      <div
        class="md:flex gap-[11.59px] md:flex-row flex-col items-center hidden"
      >
        <div class="image w-[46.37px] h-[46.37px]">
          <img
            :src="imageGetter"
            alt="winpenn-image"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 class="font-bold text-[18px] leading-[28.98px]">
            {{ profileStore.first_name }}
          </h2>
        </div>
        <div class="arrow-down text-[18px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import sunsetSvg from "../sunsetSvg.vue";
import { useCreateClient } from "../../_supabase/useCreateClient.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Moon } from "lucide-vue-next";
const store = useCreateClient();

const { profileStore, imageGetter } = storeToRefs(store);

const date = new Date();
const dateGetter = date.getHours();
let dateSetter = ref("");
if (dateGetter >= 0 && dateGetter < 12) {
  dateSetter.value = "Good morning";
} else if (dateGetter >= 12 && dateGetter < 17) {
  dateSetter.value = "Good afternoon";
} else {
  dateSetter.value = "Good Evening";
}
</script>
