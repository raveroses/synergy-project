<template>
  <div
    class="flex md:flex-row flex-col justify-between items-start w-full relative"
  >
    <div class="md:w-[60%] w-full flex flex-col gap-6">
      <h2 class="text-2xl font-bold">
        {{ profileStore.first_name + " " + profileStore.last_name }}
      </h2>
      <h2 class="text-[15px] font-semibold my-2">Quick actions</h2>
      <div class="flex items-center justify-between">
        <button
          class="flex md:gap-3 border border-[#800080] md:p-2 p-0.5 rounded font-semibold text-[#800080] cursor-pointer"
          v-for="item in btnList"
          :key="item.btnName"
          @click="
            item.btnName === 'Save Funds'
              ? handleIsisSavings($event)
              : item.btnName === 'Secure Loan'
                ? handleIsLoan($event)
                : item.btnName === 'Repay Loan'
                  ? handleIsRepayment($event)
                  : item.btnName === 'Transfer Funds'
                    ? handleIsTransferFund($event)
                    : null
          "
        >
          <span>
            <component :is="item.btnIcon" class="text-[12px]" />
          </span>
          <span class="md:text-[15px] text-[10px]">{{ item.btnName }}</span>
        </button>
      </div>
      <div
        class="balance flex flex-col justify-between gap-5 border border-[#800080] rounded-xl p-6"
      >
        <div class="flex justify-between text-[#800080]">
          <div class="font-semibold">Account Number</div>
          <div class="font-bold text-[18px]">
            {{ userTableInfo?.account_number ?? "" }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl text-[#800080] font-semibold">Balance</h2>
            <h1
              class="text-4xl font-semibold my-3 text-[#800080] flex items-center"
            >
              <span> {{ formattedTotalSaving }} </span>
            </h1>
          </div>

          <div class="flex items-center gap-1 bg-gray-200 rounded p-2">
            <div class="text-white bg-[#800080] rounded-full p-1 text-[15px]">
              <BadgePlus />
            </div>
            <h2 class="text-[#800080] text-md font-medium">Top - up</h2>
          </div>
        </div>
      </div>

      <div
        class="w-full flex justify-between items-center bg-gray-200 shadow rounded-xl p-6"
      >
        <div class="w-[40%]">
          <h2 class="text-xl font-medium">
            Get
            <span class="text-[#800080] font-semibold">
              $10 SingX wallet credit
            </span>
            for every friend you refer!
          </h2>
          <div class="flex items-center gap-2">
            <p class="text-[13px]">
              Referral code :
              <span class="bg-gray-300 text-[#800080] p-1 font-bold">
                4241256WE5
              </span>
            </p>
            <div class="bg-gray-200 rounded p-1">
              <Copy class="text-[12px]" />
            </div>
          </div>
        </div>

        <div class="w-[55%]">
          <img src="/images/referral.avif" alt="referral images " />
        </div>
      </div>
      <div
        class="flex md:gap-5 md:justify-start justify-between items-center md:my-0 my-3"
      >
        <div
          class="top flex justify-between items-center gap-2 bg-gray-200 shadow p-2 rounded"
        >
          <span class="text-semibold text-md font-medium text-[#800080]">
            Mobile Top-up
          </span>
          <span class="text-[14px] text-[#800080]">
            <TabletSmartphone />
          </span>
        </div>
        <div
          class="top flex justify-between items-center gap-2 bg-gray-200 shadow p-2 rounded"
        >
          <span class="text-semibold text-md font-medium text-[#800080]">
            Bill payments
          </span>
          <span class="text-[14px] text-[#800080]">
            <ReceiptText />
          </span>
        </div>
      </div>
    </div>

    <div class="md:w-[36%] w-full bg-gray-200 p-2 flex flex-col gap-5">
      <h2 class="text-[#800080] font-medium text-[16px]">Latest Transaction</h2>
      <form class="bg-white flex justify-between p-2">
        <input
          type="text"
          class="w-full outline-none"
          placeholder="Search recipient name..."
        />
        <button><Search /></button>
      </form>

      <div class="table-container p-2">
        <table class="w-full">
          <tbody class="w-full h-[100px] flex flex-col gap-2.5">
            <tr
              class="flex items-center justify-between"
              v-for="history in allHistory"
            >
              <td
                class="flex items-center justify-start gap-5"
                data-table="table-detail"
              >
                <img
                  src="/images/bene.jpg"
                  alt="images-of-beneficiaries"
                  class="w-[38.64px] h-[38.64px] rounded-[193.19px]"
                />

                <h2
                  class="font-bold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
                >
                  {{ history.accountName || profileStore.first_name }}
                </h2>
              </td>

              <td data-table="table-detail">
                <h2
                  class="font-bold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
                >
                  {{ history.date.split("T")[0].toString() }}
                </h2>
              </td>
              <td data-table="table-detail">
                <h2
                  class="font-bold text-[15.46px] leading-[23.18px] tracking-0 text-[#1D2939] space-y-[15.46px]"
                >
                  {{
                    history.amount ||
                    history.transferAmount ||
                    history.loanAmount ||
                    history.savingsMoney ||
                    history.plans.price
                  }}
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p class="text-[18px] text-[#800080] font-semibold">
          Verify your KYC to increase your account level and limits
        </p>
      </div>
      <div>
        <image
          src="/images/padlock.jpg"
          class="w-full h-[150px] object-center object-cover"
        />
      </div>
    </div>
  </div>

  <div
    class="savings absolute top-20 md:left-[35%] md:w-[600px] w-full p-6 rounded-xl bg-white z-20"
    v-show="isSavings"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Save funds</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="savingFund.handleSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          class="w-full border border-[#800080] p-3 rounded outline-none"
          v-model="savingFund.accountNumber"
          placeholder="Enter your account number"
        />
        <div>
          <span>Balance :</span> <span>{{ savingFund.savingsMoney }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="userTableName"
          class="w-full border border-[#800080] p-3 rounded outline-none"
          disabled
        />
        <div>
          Account Name :<span> {{ userTableName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="savingFund.savingsMoney"
            class="w-full border border-[#800080] p-3 rounded outline-none"
            placeholder="Enter your deposit amount"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Save funds
      </button>
    </form>
  </div>

  <div
    class="loan absolute top-20 md:left-[35%] md:w-[600px] w-full p-6 rounded-xl bg-white z-20"
    v-show="isLoan"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Loan Application</h2>
    </div>
    <form class="flex flex-col gap-5" @submit.prevent="handleLoanSubmission">
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="loanUserDetail.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-300"
          placeholder="Enter your account number"
        />
        <div>
          <span>Balance :</span> <span>{{ loanUserDetail.amount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="userTableName"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-300"
          placeholder="Please, enter your account name on the screen"
          disabled
        />
        <div>
          Account Name :<span>{{ userTableName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="loanUserDetail.loanAmount"
            class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-300"
            placeholder="Please, enter your loan amount"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold cursor-pointer"
      >
        Apply Loan
      </button>
    </form>
  </div>
  <div
    class="transferFund absolute top-20 md:left-[35%] md:w-[600px] w-full p-6 rounded-xl bg-white z-20"
    v-show="isTransferFund"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Transfer</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="handleTransferSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="transferDetail.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
          placeholder="Please, enter your beneficiary's account number"
        />
        <div>
          <span>Balance :</span>
          <span>{{ transferDetail.transferAmount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="transferDetail.accountName"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
          placeholder="Please, enter your beneficiary's name"
        />
        <div>
          Account Name :<span>{{ transferDetail.accountName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="transferDetail.transferAmount"
            class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
            placeholder="Please, enter your transfer amount"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold cursor-pointer"
      >
        Send Money
      </button>
    </form>
  </div>
  <div
    class="repayment absolute top-20 md:left-[35%] md:w-[600px] w-full p-6 rounded-xl bg-white z-20"
    v-show="isRepayment"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Loan Repayment</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="handleRepaymentSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="repaymentDetail.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
          placeholder="Please, enter your account number"
        />
        <div>
          <span>Balance :</span> <span>{{ repaymentDetail.amount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="userTableName"
          class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
          placeholder="Please, enter your account name"
          disabled
        />
        <div>
          Account Name :<span>{{ userTableName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="repaymentDetail.amount"
            class="w-full border border-[#800080] p-3 rounded outline-none placeholder:text-gray-400"
            placeholder="Please, enter your loan repayment amount"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold cursor-pointer"
      >
        Pay Loan
      </button>
    </form>
  </div>
  <div
    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
    v-show="isSavings || isLoan || isRepayment || isTransferFund"
  ></div>
</template>

<script setup>
import { useTransaction } from "../components/useTransaction.js";
import { storeToRefs } from "pinia";
import {
  BadgePlus,
  Copy,
  ReceiptText,
  Search,
  Send,
  TabletSmartphone,
} from "lucide-vue-next";
import NairaIcon from "../components/icons/NairaIcon.vue";
import { onMounted } from "vue";
import { onBeforeUnmount, ref } from "vue";
import { useCreateClient } from "../_supabase/useCreateClient.js";
const fundsDetail = useTransaction();
const {
  isSavings,
  isLoan,
  formattedTotalSaving,
  savingFund,
  loanUserDetail,
  isRepayment,
  isTransferFund,
  repaymentDetail,
  transferDetail,
  allHistory,
  userTableName,
} = storeToRefs(fundsDetail);

const {
  handleIsisSavings,
  handleIsLoan,
  handleIsRepayment,
  handleIsTransferFund,
  handleRepaymentSubmission,
  handleTransferSubmission,
  handleLoanSubmission,
} = fundsDetail;

const btnList = ref([
  {
    btnName: "Save Funds",
    btnIcon: Send,
  },
  {
    btnName: "Secure Loan",
    btnIcon: Send,
  },
  {
    btnName: "Repay Loan",
    btnIcon: Send,
  },
  {
    btnName: "Transfer Funds",
    btnIcon: Send,
  },
]);

onMounted(() => {
  const savings = document.querySelector(".savings");
  const loan = document.querySelector(".loan");
  const repayment = document.querySelector(".repayment");
  const transferFund = document.querySelector(".transferFund");

  const handleDocumentClick = (e) => {
    const target = e.target;

    if (!(target instanceof Node)) return;

    if (isSavings.value && savings && !savings.contains(target)) {
      isSavings.value = false;
    }

    if (isLoan.value && loan && !loan.contains(target)) {
      isLoan.value = false;
    }
    if (isRepayment.value && repayment && !repayment.contains(target)) {
      isRepayment.value = false;
    }
    if (
      isTransferFund.value &&
      transferFund &&
      !transferFund.contains(target)
    ) {
      isTransferFund.value = false;
    }
  };

  window.addEventListener("click", handleDocumentClick);

  onBeforeUnmount(() => {
    window.removeEventListener("click", handleDocumentClick);
  });
});

const store = useCreateClient();
const { userTableInfo, profileStore } = storeToRefs(store);
</script>
