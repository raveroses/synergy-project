<template>
  <div class="w-[290px] h-[1150px] bg-[#2E052E] p-[30px]">
    <h2
      class="text-white text-[32px] font-bold tracking-0 leading-[23.18px] text-center"
    >
      Synergy
    </h2>

    <ul class="text-white list-none flex flex-col gap-5 py-[100px]">
      <li v-for="(item, index) in sideBarMenu" :key="index">
        <router-link
          :to="`${item.path}`"
          :class="[
            'flex gap-[30px] items-center w-[235px] h-[46px] py-[7.73px] px-[11.59px] cursor-pointer ',
            item.path.toLowerCase() === currentPath
              ? 'rounded-[5.8px] bg-[#800080]'
              : '',
          ]"
        >
          <component :is="item.icon" class="text-[36px]" />
          <span
            class="font-semibold text-[15.46px] tracking-0 text-[#FCFCFD]"
            >{{ item.name }}</span
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  BanknoteArrowUp,
  Cog,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  Settings,
  SquaresExclude,
} from "lucide-vue-next";
import { useRoute } from "vue-router";

const route = useRoute();
const currentPath = ref(route.path);

const sideBarMenu = ref([
  {
    icon: LayoutDashboard,
    name: "My Account",
    path: "/",
  },

  {
    icon: HandCoins,
    name: "Savings",
    path: "/savings",
  },
  {
    icon: Cog,
    name: "Loans",
    path: "/loans",
  },
  {
    icon: SquaresExclude,
    name: "Investments",
    path: "/investments",
  },
  {
    icon: BanknoteArrowUp,
    name: "Fund Transfer",
    path: "/fund-transfer",
  },
  {
    icon: CreditCard,
    name: "Bill Payment ",
    path: "/bill-payment",
  },
  {
    icon: Settings,
    name: "Setting",
    path: "/setting",
  },
]);

watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);

</script>
