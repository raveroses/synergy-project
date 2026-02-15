<template>
  <div class="md:px-10 px-2 z-0">
    <h1 class="text-2xl font-semibold pb-5">Bill payment</h1>

    <form @submit.prevent="handleSearch">
      <div
        class="flex justify-between items-center w-full bg-[#800080] p-2 rounded"
      >
        <input
          type="text"
          v-model="searchValue"
          class="bg-white w-[70%] p-1 outline-none"
          placeholder="Search for your payment"
        />
        <button type="submit" class="bg-white rounded p-2"><Search /></button>
      </div>
    </form>

    <div class="my-5 bg-[#800080] flex items-center justify-between py-5 px-10">
      <div
        :class="[
          'w-20 text-center  mx-auto rounded p-1 cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:text-[#800080]',
          isCategory === item.bill.toLowerCase()
            ? 'bg-white text-[#800080]'
            : 'text-white bg-transparent',
        ]"
        v-for="item in billList"
        :key="item.bill"
        @click="handleCategory(item.bill)"
      >
        <component :is="item.icon" :size="30" class="mx-auto" />
        <h1 class="text-md font-semibold">{{ item.bill }}</h1>
      </div>
    </div>
    <div
      class="bg-[#800080] w-full grid md:grid-cols-4 grid-cols-3  gap-3 p-5"
      v-if="isCategory === 'electricity'"
    >
      <div
        v-for="eachSub in electricityPrice"
        class="bg-white rounded p-2 text-center w-[150px] h-[120px] cursor-pointer"
        @click="handlePlan(eachSub)"
      >
        <p class="text-md italic">
          {{ eachSub.id.split("-")[0] + eachSub.id.split("-")[1] }}
        </p>
        <h1 class="text-xl font-semibold">{{ eachSub.band }}</h1>
        <div class="text-2xl font-bold">{{ formatNaira(eachSub.price) }}</div>
        <p class="text-md italic">
          {{ eachSub.subscription }}
        </p>
      </div>
    </div>

    <div
      class="bg-[#800080] w-full grid md:grid-cols-4 grid-cols-3  gap-3 p-5"
      v-if="isCategory === 'water'"
    >
      <div
        v-for="eachSub in waterPrice"
        class="bg-white rounded p-2 text-center w-[150px] h-[120px] cursor-pointer"
        @click="handlePlan(eachSub)"
      >
        <p class="text-md italic">
          {{ eachSub.id.split("-")[0] + eachSub.id.split("-")[1] }}
        </p>
        <div class="text-2xl font-bold">{{ formatNaira(eachSub.price) }}</div>
        <p class="text-md italic">
          {{ eachSub.litre }}
        </p>
      </div>
    </div>
    <div
      class="bg-[#800080] w-full grid md:grid-cols-4 grid-cols-3  gap-3 p-5"
      v-if="isCategory === 'gas'"
    >
      <div
        v-for="eachSub in gasPrice"
        class="bg-white rounded p-2 text-center w-[150px] h-[120px] cursor-pointer"
        @click="handlePlan(eachSub)"
      >
        <p class="text-md italic">
          {{ eachSub.id.split("-")[0] + eachSub.id.split("-")[1] }}
        </p>
        <div class="text-2xl font-bold">{{ formatNaira(eachSub.price) }}</div>
        <p class="text-md italic">
          {{ eachSub.litre }}
        </p>
      </div>
    </div>

    <div class="my-10 ">
      <h1 class="text-2xl font-semibold">Invoice</h1>

      <table class="my-10 ">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Billing Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody v-if="searchingResult.length > 0">
          <tr v-for="plan in searchingResult" :key="plan.plans.id">
            <td>{{ plan.plans.id }}</td>
            <td>{{ plan.plans.price }}</td>
            <td>{{ plan.category }}</td>
            <td>{{ plan.date.split("T")[0] }}</td>
            <td>paid</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="plan in billHistory" :key="plan.plans.id">
            <td>{{ plan.plans.id }}</td>
            <td>{{ plan.plans.price }}</td>
            <td>{{ plan.category }}</td>
            <td>{{ plan.date.split("T")[0] }}</td>
            <td>paid</td>
          </tr>
        </tbody>
      </table>

      <div v-if="isLoading">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Droplets, Flame, Search, Zap } from "lucide-vue-next";
import { ref } from "vue";
import { useTransaction } from "../../useTransaction.js";
import { storeToRefs } from "pinia";
import Spinner from "@/components/ui/spinner/Spinner.vue";
const fundDetails = useTransaction();
const { isCategory, billHistory, searchValue, searchingResult, isLoading } =
  storeToRefs(fundDetails);
const { handleCategory, formatNaira, handlePlan, handleSearch } = fundDetails;

const billList = ref([
  {
    icon: Droplets,
    bill: "Water",
  },
  {
    icon: Zap,
    bill: "Electricity",
  },
  {
    icon: Flame,
    bill: "Gas",
  },
]);

const electricityPrice = ref([
  {
    id: crypto.randomUUID(),
    band: "Band A",
    price: 7000,
    subscription: "monthly",
    icon: "zap",
  },
  {
    id: crypto.randomUUID(),
    band: "Band B",
    price: 3000,
    subscription: "monthly",
    icon: "zap",
  },
  {
    id: crypto.randomUUID(),
    band: "Band A",
    price: 14000,
    subscription: "2 months",
    icon: "zap",
  },
  {
    id: crypto.randomUUID(),
    band: "Band A",
    price: 50000,
    subscription: "yearly",
    icon: "zap",
  },
  {
    id: crypto.randomUUID(),
    band: "Band B",
    price: 6000,
    subscription: "2 months",
    icon: "zap",
  },
  {
    id: crypto.randomUUID(),
    band: "Band B",
    price: 20000,
    subscription: "yearly",
    icon: "zap",
  },
]);

const waterPrice = ref([
  {
    id: crypto.randomUUID(),
    litre: "1 L",
    price: 7000,
    icon: "droplet",
  },
  {
    id: crypto.randomUUID(),
    litre: "3 L",
    price: 10000,
    icon: "droplet",
  },
  {
    id: crypto.randomUUID(),
    litre: "3 L",
    price: 12000,
    icon: "droplet",
  },
  {
    id: crypto.randomUUID(),
    litre: "4 L",
    price: 15000,
    icon: "droplet",
  },
  {
    id: crypto.randomUUID(),
    litre: "5 L",
    price: 18000,
    icon: "droplet",
  },
  {
    id: crypto.randomUUID(),
    litre: "10 L",
    price: 100000,
    icon: "droplet",
  },
]);

const gasPrice = ref([
  {
    id: crypto.randomUUID(),
    litre: "1 L",
    price: 7000,
    icon: "flame",
  },
  {
    id: crypto.randomUUID(),
    litre: "3 L",
    price: 10000,
    icon: "flame",
  },
  {
    id: crypto.randomUUID(),
    litre: "3 L",
    price: 12000,
    icon: "flame",
  },
  {
    id: crypto.randomUUID(),
    litre: "4 L",
    price: 15000,
    icon: "flame",
  },
  {
    id: crypto.randomUUID(),
    litre: "5 L",
    price: 18000,
    icon: "flame",
  },
  {
    id: crypto.randomUUID(),
    litre: "10 L",
    price: 100000,
    icon: "flame",
  },
]);
</script>
