<template>
  <div
    :class="[
      'md:w-[290px] md:h-[1150px] w-[250px] h-full bg-[#2E052E] p-[30px] md:static absolute z-30',
      isOpen ? 'block' : 'hidden',
    ]"
    ref="sidebar"
  >
    <h2
      class="text-white md:text-[32px] text-[20px] font-bold tracking-0 leading-[23.18px] md:text-center text-left"
    >
      Synergy
    </h2>

    <ul class="text-white list-none flex flex-col gap-5 py-[100px]">
      <li v-for="(item, index) in sideBarMenu" :key="index">
        <router-link
          :to="`${item.path}`"
          :class="[
            'flex gap-[30px] items-center md:w-[235px] h-[46px] w-[200px] py-[7.73px] px-[11.59px] cursor-pointer ',
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
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
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
import { useCreateClient } from "../../_supabase/useCreateClient.js";
import { storeToRefs } from "pinia";
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

const props = defineProps({
  toggleRef: Object,
});
const store = useCreateClient();

const { isOpen } = storeToRefs(store);

const sidebar = ref(null);

const handleOutsideClick = (event) => {
  if (window.innerWidth >= 768) return;

  if (!sidebar.value) return;

  // ignore toggleRef clicks
  if (
    !sidebar.value.contains(event.target) &&
    (!props.toggleRef.value || !props.toggleRef.value.contains(event.target))
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);
</script>
