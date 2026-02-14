<template>
  <div class="md:w-[40%] w-full flex-col z-0">
    <div
      class="loan rounded-[5.8px] md:p-5 p-2 bg-[#FFFFFF]"
      v-if="currentValue"
    >
      <div class="flex justify-between">
        <h2 class="text-[20px] font-medium">
          {{
            // route.path.includes("loan")
            //   ? loanDetail.accountName
            //   : acctDetail.accountName

            profileStore.first_name
          }}
        </h2>
        <EllipsisVertical class="text-[36px]" />
      </div>
      <h2
        :class="[
          'font-bold text-[32px] leading-[42.5px] py-5',
          route.path.includes('loan') ? 'text-[#F60A0A]' : 'text-black',
        ]"
      >
        {{
          route.path.includes("loan")
            ? formattedTotalLoan
            : formattedTotalSaving
        }}
      </h2>
      <p
        class="font-semibold text-[15px] leading-[23.18px] tracking-0 text-[#344054]"
      >
        {{
          route.path.includes("loan")
            ? "Account to be paid"
            : "Balance Available"
        }}
      </p>
    </div>

    <div class="container rounded-[5.8px] mt-5 bg-[#FFFFFF]">
      <div class="heading flex justify-between">
        <h2
          class="font-bold text-[19.32px] leading-[28.98px] tracking-0 text-[#101828] space-y-[19.32px]"
        >
          Saved Beneficiaries
        </h2>
        <div
          @click="handleAllDisplay"
          class="text-[15px] font-bold cursor-pointer"
        >
          See All
        </div>
      </div>

      <div
        class="beneficiaries px-5"
        v-for="eachHistory in beneficiariesDisplay"
      >
        <div
          class="flex items-center gap-5 border-[0.95px] border-[#EAECF0] rounded-[7px] p-2 mt-2.5"
          v-if="'transferAmount' in eachHistory"
        >
          <img
            src="/images/bene.jpg"
            alt="images-of-beneficiaries"
            class="w-[38.64px] h-[38.64px] rounded-[193.19px]"
          />
          <h2
            class="font-semibold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
          >
            {{ eachHistory.accountName }}
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
import { useTransaction } from "./useTransaction";
import { storeToRefs } from "pinia";
import { useCreateClient } from "../_supabase/useCreateClient.js";
import { ref } from "vue";
const fundDetails = useTransaction();
const {
  loanDetail,
  acctDetail,
  formattedTotalLoan,
  formattedTotalSaving,
  transactionHistory,
} = storeToRefs(fundDetails);

const currentValue = computed(() => {
  if (!props.loanPageProps) {
    return { name: "", amount: "", caption: "" };
  }

  if (route.path.includes("savings")) {
    return (
      acctDetail.value ?? {
        savingsMoney: null,
        acctNumber: "",
        accountName: "",
      }
    );
  } else if (route.path.includes("loan")) {
    return (
      loanDetail.value ?? {
        savingsMoney: null,
        acctNumber: "",
        accountName: "",
      }
    );
  } else if (route.path.includes("my-account")) {
    return acctDetail.value ?? { acctName: "", acctNumber: "", loanAmount: "" };
  }
});

let displayLimit = ref(3);

const lengthOfBeneficiaries = computed(() => {
  return transactionHistory.value.filter((item) => "transferAmount" in item)
    .length;
});
const beneficiariesDisplay = computed(() => {
  return transactionHistory.value
    .filter((item) => "transferAmount" in item)
    .slice(0, displayLimit.value);
});

const handleAllDisplay = () => {
  displayLimit.value = lengthOfBeneficiaries.value;
};

const store = useCreateClient();
const { profileStore } = storeToRefs(store);
</script>
