<template>
  <div class="w-[405.08px] h-[478px]">
    <div
      class="loan w-[397.61px] h-[184.98px] rounded-[5.8px] p-5 bg-[#FFFFFF]"
      v-if="currentValue"
    >
      <div class="flex justify-between">
        <h2 class="text-[20px] font-medium">
          {{ currentValue.status ?? "name" }}
        </h2>
        <EllipsisVertical class="text-[36px]" />
      </div>
      <h2
        :class="[
          'font-bold text-[32px] leading-[42.5px] py-5',
          currentValue.status === 'Loans' ? 'text-[#F60A0A]' : 'text-black',
        ]"
      >
        {{ currentValue.amount ?? "amount" }}
      </h2>
      <p
        class="font-semibold text-[15px] leading-[23.18px] tracking-0 text-[#344054]"
      >
        {{ currentValue.caption ?? "caption" }}
      </p>
    </div>

    <div
      class="w-[399px] h-[255px] rounded-[5.8px] p-5 mt-5 bg-[#FFFFFF]"
    >
      <div class="flex justify-between">
        <h2
          class="font-bold text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px]"
        >
          Saved Beneficiaries
        </h2>
        <div>See All</div>
      </div>

      <div class="beneficiaries">
        <div
          class="flex items-center gap-5 border-[0.95px] border-[#EAECF0] rounded-[7px] p-2 mt-2.5"
        >
          <Img
            src="/images/bene.jpg"
            alt="images-of-beneficiaries"
            class="w-[38.64px] h-[38.64px] rounded-[193.19px]"
          />
          <h2
            class="font-semibold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
          >
            Kathlyn man
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loanPageProps: Object,
});
import { EllipsisVertical } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const currentValue = computed(() => {
  if (!props.loanPageProps) {
    return { name: "", amount: "", caption: "" };
  }

  if (route.path.includes("savings")) {
    return props.loanPageProps.savings || { name: "", amount: "", caption: "" };
  } else if (route.path.includes("loan")) {
    return props.loanPageProps.loan || { name: "", amount: "", caption: "" };
  } else if (route.path.includes("my-account")) {
    return props.loanPageProps.savings || { name: "", amount: "", caption: "" };
  }

  return { name: "", amount: "", caption: "" };
});
</script>
