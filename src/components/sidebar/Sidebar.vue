<template>
  <div class="w-[290px] h-[1011px] bg-[#2E052E] p-[30px]">
    <h2
      class="text-white text-[32px] font-[700] tracking-0 leading-[23.18px] text-center"
    >
      Synergy
    </h2>

    <ul class="text-white list-none flex flex-col gap-[20px] py-[100px]">
      <li
        v-for="(item, index) in sideBarMenu"
        :key="index"
        :class="[
          'flex gap-[30px] items-center w-[235px] h-[46px] py-[7.73px] px-[11.59px] ',
          item.name.toLowerCase() === setId.toLowerCase()
            ? 'rounded-[5.8px] bg-[#800080]'
            : '',
        ]"
        @click="handleSideBarClick(item.name)"
      >
        <component :is="item.icon" class="text-[36px]" />
        <span class="font-[600] text-[15.46px] tracking-0 text-[#FCFCFD]">{{
          item.name
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  BanknoteArrowUp,
  Cog,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  Settings,
  SquaresExclude,
  UserRoundPen,
} from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const sideBarMenu = ref([
  {
    icon: LayoutDashboard,
    name: "My Account",
  },

  {
    icon: HandCoins,
    name: "Savings",
  },
  {
    icon: Cog,
    name: "Loans",
  },
  {
    icon: SquaresExclude,
    name: "Investments",
  },
  {
    icon: BanknoteArrowUp,
    name: "Fund Transfer",
  },
  {
    icon: CreditCard,
    name: "Bill Payment ",
  },
  {
    icon: UserRoundPen,
    name: "Profile",
  },
  {
    icon: Settings,
    name: "Setting",
  },
]);

const setId = ref("");

const handleSideBarClick = (id) => {
  console.log("ID", id);
  setId.value = id;
  router.push(`/${id.toLowerCase().replace(/\s+/g, "-")}`);
};
</script>
