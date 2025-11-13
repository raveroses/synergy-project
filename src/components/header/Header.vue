<template>
  <header class="w-[1101px] h-[97px] bg-[#FFFFFF]">
    <div
      class="w-[1050.04px] h-[46.37px] absolute top-[25.12px] left-[320.7px] flex justify-between"
    >
      <div class="flex items-center gap-5">
        <h1 class="font-bold text-[23.18px] leading-[30.91px] text-[#101828]">
          Good Morning
        </h1>
        <div class="w-[38.64px] h-[38.64px]">
          <sunsetSvg />
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

        <div class="flex gap-[11.59px] items-center">
          <div class="image w-[46.37px] h-[46.37px]">
            <img
              src="/images/WilliamPenn.jpg"
              alt="winpenn-image"
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 class="font-[700] text-[18px] leading-[28.98px]">Username</h2>
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
    </div>
  </header>
</template>

<script setup>
import sunsetSvg from "../../../public/sunsetSvg.vue";
</script>
